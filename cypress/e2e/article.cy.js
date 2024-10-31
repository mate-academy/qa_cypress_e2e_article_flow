/// <reference types='cypress' />

describe('Article flow', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.visit('/');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.login(user.email, user.username, user.password);
      cy.getCookie('auth').should('exist');
      cy.reload();
      cy.task('generateArticle').then((generatedArticle) => {
        article = generatedArticle;
      });
    });
  });

  it('should allow user to create an article', () => {
    cy.contains('.nav-link', 'New Article').click();
    cy.url().should('contain', '/editor');

    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder(`What's this article about?`)
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);
    cy.findByPlaceholder('Enter tags')
      .type(`${article.tagList}{enter}`);

    cy.contains('.btn', 'Publish').click();
    cy.url().should('contain', 'article/');
  });

  it('should delete the created article', () => {
    const { title, description, body } = article;

    cy.createArticle(title, description, body).then((response) => {
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

        cy.visit(`/article/${articleSlug}`)
          .should('not.be.visible');
      });
    });
  });
});
