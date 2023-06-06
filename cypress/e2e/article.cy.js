/// <reference types="cypress" />

describe('an article', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.visit('user/register');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be possible to create', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('editor');
    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get('[placeholder="What\'s this article about?"]').type(article.desc);
    cy.get('[placeholder="Write your article (in markdown)"]').type(article.body);
    cy.get('.btn').click();
    cy.get('h1').should('contain', article.title)      
  });

  it.only('should be possible to delete', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('editor');
    cy.createArticle(article.title, article.description, article.body).then((response) => {
      const slug = response.body.article.slug;
    cy.visit(`/article/${slug}`);
    cy.contains('.btn', 'Delete Article').click();
    cy.contains('.nav-link', 'Global Feed').should('be.visible');
    cy.get('.article-preview').should('contain.text', 'No articles are here... yet.');
    });
    });
  });
