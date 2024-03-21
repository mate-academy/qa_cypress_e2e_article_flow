const { faker } = require('@faker-js/faker');

describe('', () => {
  let user;
  const article = {
    title: faker.lorem.word(),
    about: faker.lorem.words(2),
    content: faker.lorem.words(10),
    tag: faker.lorem.word()
  };

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

    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(article.content);

    cy.get('[placeholder="Enter tags"]').type(`${article.tag}{enter}`);

    cy.get('.btn').click();

    cy.get('h1').should('contain.html', article.title);

    cy.url().should('include', '/article/');
  });

  it('should provide an ability to delete an article', () => {
    cy.login(user.email, user.username, user.password);

    cy.createArticle(article.title, article.about, article.content);

    cy.get('.ion-trash-a').first().click();

    cy.get('.col-md-9').should('not.contain.text', article.title);
  });
});
