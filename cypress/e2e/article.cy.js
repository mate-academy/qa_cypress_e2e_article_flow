/// <reference types= "cypress" />

describe('', () => {
  let user;
  let article;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should provide an ability to create an article', () => {
    cy.login(user.email ,user.username, user.password);
    cy.visit('/editor');

    cy.getPlaceholder('Article Title')
      .type(article.title);
    cy.getPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.getPlaceholder('Write your article (in markdown)')
      .type(article.body);
    cy.contains('.btn', 'Publish Article')
      .click();
  });

  it('should provide an ability to delete an article', () => {
    cy.login(user.email ,user.username, user.password);
    cy.visit('/editor');
    cy.createArticle(article.title, article.description, article.body);
  });
});
