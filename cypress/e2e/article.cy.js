/// <reference types='cypress' />

describe('The Article page', () => {
  let user;
  let article;
  let articlePage;
  const newArticle = '/editor';

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should allow the user to create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit(newArticle);
    cy.fillWith('[placeholder="Article Title"]', article.title);
    cy.fillWith('[placeholder^="What\'s this"]', article.description);
    cy.fillWith('[placeholder^="Write your article"]', article.body);
    cy.fillWith('[placeholder="Enter tags"]', article.body);
    cy.clickOnElement('button', 'Publish Article');
  });

  it('should allow the user to delete the created article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        articlePage = response.body.article.slug;
        cy.visit(`/article/${articlePage}`);
      });
    cy.clickOnElement('.btn', 'Delete Article');
    cy.on('window:confirm', () => {
      return true;
    });
    cy.get('.article-preview').should('contain', 'No articles');
  });
});
