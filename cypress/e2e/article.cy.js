/// <reference types ="cypress" />
/// <reference types ="../support" />

describe('', () => {
  let user;
  let article;

  before(() => {
    cy.visit('/');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
  });
});

  it('Create the article', () => {

    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('input[placeholder="Article Title"]')
    .type(article.title);

    cy.get('input[placeholder="What\'s this article about?"]')
    .type(article.description);

    cy.get('textarea[placeholder="Write your article (in markdown)"]')
    .type(article.body);

    cy.get('input[placeholder="Enter tags"]')
    .type(article.tag);

    cy.get('.btn-primary')
    .click().click();

    cy.get('.col-md-12')
    .should('contain', article.body);

    cy.get('.banner')
    .should('contain', article.title);

  });

  it('Delete the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(
      article.title,
      article.description,
      article.body
    ).then((response) => {
      const slug = response.body.article.slug;

      cy.visit(`/article/${slug}`);
    
    });
    
      cy.get('.btn.btn-outline-danger.btn-sm')
      .should('contain', 'Delete Article')
      .eq(0)
      .click();

      cy.get('.article-preview')
      .should('contain', 'No article are here');
  });
});
