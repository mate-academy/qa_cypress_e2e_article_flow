/// <reference types= "cypress" /> 

describe('Article', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('input[placeholder*="Article Title"]')
      .type(article.title);
    cy.get('input[placeholder*="What\'s this article about?"]')
      .type(article.desc);
      cy.get('textarea.form-control[placeholder="Write your article (in markdown)"]')
      .type(article.body);
    cy.get('.btn')
      .click();
    cy.get('h1')
      .should('contain' , article.title)      
  });

  it('should be deleted using article page', () => {
    cy.visit('https://conduit.mate.academy/');
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.desc, article.body);
    cy.visit(`https://conduit.mate.academy/profile/${user.username}`);
    cy.get('h1')
      .should('contain', article.title)
      .click();
    cy.contains('button.btn.btn-outline-danger.btn-sm', 'Delete Article')
      .click();
    cy.on("window:confirm", (s) => {
      return true;
    });
    cy.visit(`https://conduit.mate.academy/profile/${user.username}`);
    cy.reload();
    cy.get('h1')
      .should('not.exist')
    });
  });

