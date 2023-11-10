/// <reference types="cypress" />

describe('article flow', () => {
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

  it('should create the article', () => {
    cy.login(user.email, user.username, user.password);

    cy.visit('/editor');

    cy.findByPlaceholder('Article Title')
      .type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);
    cy.contains('.btn', 'Publish Article')
      .click();
    cy.get('.article-page')
      .should('contain', article.title);
    cy.get('.article-content')
      .should('contain', article.body);
    cy.get('.btn')
      .contains('Edit Article')
      .should('be.visible');
    cy.get('.btn')
      .contains('Delete Article')
      .should('be.visible');
  });

  it.only('should delete the article', () => {
    const confirmMessage = 'Do you really want to delete it?';
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`/article/${slug}`);
        cy.get('.btn')
          .contains('Delete Article').click();
        cy.on('window:confirm', (str) => {
          expect(str).to.equal(confirmMessage);
        });
        cy.url().should('equal', 'https://conduit.mate.academy/');
        cy.get('.col-md-9')
          .should('not.contain', article.title);
      });
  });
});
