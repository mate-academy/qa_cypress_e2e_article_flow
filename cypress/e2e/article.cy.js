/// <reference types="cypress" />

describe('Conduit article', () => {
  let user;
  let article;
  
  beforeEach(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    })
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    })
    cy.visit('/')
  });

  it('shoud provide the ability to create article', () => {
    cy.login(user.email, user.password, user.username);
    cy.visit('/editor');
    cy.findByPlaceholder('Article Title')
      .type(article.title)
    cy.findByPlaceholder('What\'s this')
      .type(article.description)
    cy.findByPlaceholder('Write your article')
      .type(article.body)
    cy.contains('.btn', 'Publish Article')
      .click();
    cy.get('.article-page')
      .should('contain', article.title);
    cy.get('.article-content')
      .should('contain', article.body);
    cy.contains('.btn', 'Edit Article')
      .should('be.visible');
    cy.contains('.btn', 'Delete Article')
      .should('be.visible');
  });

  it('shoud provide the ability to delete article', () => {
    cy.createArticle(article.title, article.description, article.body)
      .then(response => {
      cy.log(response);
      const slug = response.body.article.slug;
      cy.visit(`/articles/${slug}`);
      cy.contains('.btn', 'Delete Article')
        .eq(0)
        .click();
      cy.on('window:confirm', (str) => {
        expect(str).to.equal('Do you really want to delete it?');
      });
      cy.contains('.article-preview', article.title)
        .should('not.exist');
    });
  });
});
