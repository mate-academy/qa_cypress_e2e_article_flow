const { faker } = require('@faker-js/faker');

describe('Conduit', () => {
  let user;
  const article = {
    title: faker.lorem.word(),
    about: faker.lorem.words(5),
    content: faker.lorem.words(10),
    tag: faker.lorem.word()
  };
  const deleteButton = '.article-actions > .article-meta > :nth-child(3)';
  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to create an article', () => {
    cy.login(user.email, user.username, user.password);

    cy.visit('/editor');

    cy.get('[placeholder="Article Title"]').type(article.title);

    cy.get('[placeholder="What\'s this article about?"]').type(article.about);

    cy.get('[placeholder="Write your article (in markdown)"]').type(
      article.content
    );

    cy.get('[placeholder="Enter tags"]').type(`${article.tag}{enter}`);

    cy.get('.btn').click();

    cy.get('h1').should('contain.html', article.title);

    cy.url().should('include', '/article/');
  });

  it('should provide an ability to delete an article', () => {
    cy.login(user.email, user.username, user.password);

    cy.createArticle(article.title, article.about, article.content);

    cy.reload();

    cy.contains('.nav-link', user.username.toLowerCase()).click();

    cy.contains('.preview-link', `Article title: ${article.title}`).click();
    cy.get(deleteButton).click();

    cy.on('window:confirm', (confirmText) => {
      expect(confirmText).to.equal('Do you really want to delete it?');
      return true;
    });
    cy.contains('.nav-link', user.username.toLowerCase()).click();
  });
});
