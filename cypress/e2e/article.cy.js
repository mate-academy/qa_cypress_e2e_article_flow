describe('Conduit page', () => {
  const faker = require('faker');

  let user;

  const article = {
    title: faker.lorem.word(),
    description: faker.lorem.word(),
    body: faker.lorem.word()
  };

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.visit('https://conduit.mate.academy/');
  });

  it('should provide the ability to create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');

    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(article.description);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(article.body);

    cy.get('.btn').click();
    cy.get('.banner').should('contain', article.title);
  });

  it('should provide the ability to delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        cy.visit(`/article/${response.body.article.slug}`);
      });
    cy.contains('button', 'Delete Article').click();
    cy.on('window:confirm', (alert) => {
      expect(alert).to.equal('Do you really want to delete it?');
      return true;
    });
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  });
});
