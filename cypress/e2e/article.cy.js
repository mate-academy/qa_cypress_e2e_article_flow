/// <reference types='cypress' />

describe('Article Creation and Deletion', () => {
  let user, article;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('Sign in and Create an Article', () => {
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        cy.visit(`/article/${response.body.article.slug}`);
      });

    cy.get('.banner').should('contain', article.title);
    cy.get('.article-content').should('contain', article.body);
    cy.contains('.btn', 'Edit Article').should('be.visible');
    cy.contains('.btn', 'Delete Article').should('be.visible');
  });

  it('Delete an Article', () => {
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        cy.visit(`/article/${response.body.article.slug}`);
        cy.contains('.btn', 'Delete Article').click();

        cy.on('window:confirm', (str) => {
          expect(str).to.equal('Do you really want to delete it?');
        });

        cy.url().should('equal', 'https://conduit.mate.academy/');
      });
  });
});
