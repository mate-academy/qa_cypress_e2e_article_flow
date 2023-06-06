/// <reference types="cypress" />

describe('Article', () => {
  let user;
  let article;
  
  beforeEach(() => {
    cy.visit('/');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should provide the ability to create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.getByPlaceholder('Article Title').type(article.title);
    cy.getByPlaceholder('What\'s this article about?').type(article.description);
    cy.getByPlaceholder('Write your article (in markdown)').type(article.body);
    cy.getByPlaceholder('Enter tags').type(article.tag+ '{enter}');
    cy.contains('button', 'Publish Article').click();

    cy.get('h1').should('contain', article.title);
    cy.get('.col-md-12').should('contain', article.body);
    cy.get('.tag-default').should('contain', article.tag);
  });

  it('should provide the ability to delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;

    cy.visit(`/article/${slug}`);
    cy.contains('button', ' Delete Article')
      .eq(0)
      .click();
    });

    cy.get('.article-preview').should('contain', 'No articles are here... yet.');
  });
});
