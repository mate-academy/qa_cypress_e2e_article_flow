///<reference types="Сypress" />
const { faker } = require('@faker-js/faker')

describe('Artical flow', () => {
  const random999 = Math.floor(Math.random() * 1000);

  const user = {
    email: faker.internet.email(),
    username: `${faker.name.lastName()}${random999}`,
    password: 'user1234'
  };

  const article = {
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
    tagList: ([faker.lorem.word()]).toString()
  };


  beforeEach( () => {
    cy.visit('')
  });

  it('Should create the article with login by API', () => {
    cy.login(user.email, user.username, user.password)
        .then(() => {
          cy.getCookie('auth')
              .should('exist');
          cy.reload();

          cy.contains('.nav-link', 'New Article')
              .click();

          cy.getByPlaceholder('Article Title').type(article.title);
          cy.getByPlaceholder('What\'s this article about?')
              .type(article.description);
          cy.getByPlaceholder('Write your article (in markdown)')
              .type(article.body);
          cy.getByPlaceholder('Enter tags')
              .click()
              .type(`${article.tagList}{enter}`);

          cy.contains('.btn', 'Publish').click();

          cy.url().should('contain', 'article/');
        });
      });

    it('Should create and delete article with API', () => {
        cy.createArticle(article.title, article.description, article.body)
            .then((response) => {
                const articleSlug = response.body.article.slug;

                cy.visit(`/article/${articleSlug}`);
                cy.url().should('contain', `article/${articleSlug}`);

                cy.getCookie('auth').then((token) => {
                    const authToken = token.value;

                    cy.request({
                        method: 'DELETE',
                        url: `/api/articles/${articleSlug}`,
                        headers: {
                            Authorization: `Token ${authToken}`
                        }
                    }).then((response) => {
                        expect(response.status).to.eq(204);
                    });

                    cy.visit(`/article/${articleSlug}`);
                    cy.contains('Article not found');
                });
            });
    });
});
