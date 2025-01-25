const { faker } = require('@faker-js/faker');

describe('', () => {
  let user;
  let article;
  beforeEach(() => {
    const randomNumber = Math.random().toString().slice(2, 6);
    const username = faker.internet.userName() + randomNumber;
    user = {
      username,
      email: username + '@gmail.com',
      password: faker.internet.password()
    };
    article = {
      title: user.username,
      description: user.username + 'article',
      body: user.username + 'article' + 'body'
    };
    cy.visit('/');
    cy.login(user.email, user.username, user.password);
  });

  it('should create an article', () => {
    cy.visit('/editor');
    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(article.description);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(article.body);
    cy.contains('button', 'Publish Article').click();
    cy.contains('.container', article.title).should('exist');
  });

  it('should delete the article', () => {
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`article/${slug}`);
      });

    cy.contains('.btn', 'Delete Article').click();
    cy.contains('.nav-link', 'Global Feed').should('be.visible');
    cy.contains(article.title).should('not.exist');
  });
});
