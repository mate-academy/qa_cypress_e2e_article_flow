/// <reference types='cypress' />

describe('Condiut', () => {
  let user;
  let article;

  before(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('articleData').then(articleData => {
      article = articleData;
    });
  });


  it('test', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get('[placeholder="What\'s this article about?"]').type(article.shortInfo);
    cy.get('[placeholder="Write your article (in markdown)"]').type(article.articleBody);
    cy.get('[placeholder="Enter tags"]').type(`${article.tags}{enter}`);
    cy.contains('button', 'Publish Article').click();
    cy.contains(article.articleBody).should('exist');
  });

  it('delete', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.shortInfo, article.articleBody, article.tags);
    cy.visit('/');
    cy.contains('a', user.username.toLowerCase()).click();
    cy.contains(article.title).click();
    cy.contains('button', 'Delete Article').click();
    cy.wait(2000);
    cy.contains('a', user.username.toLowerCase()).click();
    cy.get('.article-preview').should('not.contain', article.title);
  });
});
