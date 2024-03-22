/// <reference types='cypress' />

const { ar } = require("@faker-js/faker");

describe('', () => {
  let user;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
      cy.visit('/');
    });
  });

  it('should have the ability to create an article', () => {
    let article;
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
      cy.get('.ion-compose').click();
      cy.get('[placeholder="Article Title"]').type(article.title);
      cy.get('[placeholder="What\'s this article about?"]').type(article.about);
      cy.get('[placeholder="Write your article (in markdown)"]')
      .type(article.body);
      cy.get('button.btn-primary').contains('Publish Article').click();
      cy.get('button.btn-outline-danger').eq(0).should('exist');
      cy.get('button.btn-outline-danger').eq(0).should('be.enabled');
      cy.get('button.btn-outline-danger').eq(1).should('exist');
      cy.get('button.btn-outline-danger').eq(1).should('be.enabled');
    });
  });

  it('should have the ability to delete an article', () => {
    const textConfirmAlert = 'Do you really want to delete it?';
    let article;

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
      cy.createArticle(article.title, article.about, article.body);
      cy.get('[alt="your profile image"]').click();
      cy.contains('.article-preview', article.title).click();
      cy.get('button.btn-outline-danger').eq(0).click();
      cy.on('window:confirm', (textOfConfirm) => {
        expect(textOfConfirm).to.equal(textConfirmAlert);
        return true;
      });
      cy.get('[alt="your profile image"]').click();
      cy.get('.article-preview').should('not.contain', article.title);
    });
  });
});
