/// <reference types="cypress" />

describe('', () => {
  beforeEach(function () {
    cy.task('generateUser')
      .then((user) => {
        cy.login(user).then(() => user);
      })
      .as('user');

    cy.get('a[href="/editor"]').click();

    cy.task('createArticle', this.user)
      .then(function (article) {
        cy.createArticle(article.title, article.description, article.body)
          .then(() => article);
      }).as('article');
  });

  it('should create an article', function () {
    cy.contains('a', 'Home').click();
    cy.contains('a', 'Global Feed').click();

    cy.contains('a.author', `${this.user.username.toLowerCase()}`).should(
      'exist'
    );
  });

  it('should delete the article', function () {
    cy.contains('a', 'Home').click();
    cy.contains('a', 'Global Feed').click();

    cy.contains('.article-preview', `${this.user.username.toLowerCase()}`).click();
    cy.contains('button', 'Delete Article').click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000);

    cy.contains('a', 'Home').click();

    cy.contains('a', 'Global Feed').click();

    cy.contains('a.author', `${this.user.username.toLowerCase()}`).should(
      'not.exist'
    );
  });
});
