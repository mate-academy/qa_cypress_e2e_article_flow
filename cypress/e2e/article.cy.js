/// <reference types='cypress' />

describe('Conduit Article page', () => {
  let user = '';
  let article = '';

  beforeEach(() => {
    cy.visit('/');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should provide an ability to create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        cy.visit(`/article/${response.body.article.slug}`);
      });

    cy.get('.banner')
      .should('contain', article.title);
    cy.get('.article-content')
      .should('contain', article.body);
    cy.get('.btn')
      .should('contain', 'Edit Article');
    cy.get('.btn')
      .should('contain', 'Delete Article');
  });

  it('should provide an ability to delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        cy.visit(`/article/${response.body.article.slug}`);
        cy.contains('.btn', 'Delete Article')
          .click();
        cy.on('window:confirm', (text) => {
          expect(text).to.equal('Do you really want to delete it?');

          return true;
        });

        cy.get('.article-preview')
          .should('contain', 'No articles are here... yet.');
        cy.url()
          .should('equal', 'https://conduit.mate.academy/');
      });
  });
});
