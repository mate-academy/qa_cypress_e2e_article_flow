/// <reference types='cypress'/>

describe('user  ability to create and delete article', () => {
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
  it('Create the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('[placeholder="Article Title"]')
      .type(article.title);
    cy.get('[placeholder^="What\'s this"]')
      .type(article.description);
    cy.get('[placeholder^="Write your"]')
      .type(article.body);
    cy.contains('button', 'Publish Article')
      .click();
    cy.get('.article-page')
      .should('contain', article.title);
    cy.get('.article-content')
      .should('contain', article.body);
    cy.get('.btn')
      .contains('Delete Article')
      .should('be.visible');
  });

  it('should delete the article', () => {
    let previousUrl;
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body).then(
      (response) => {
        cy.visit(`/article/${response.body.article.slug}`);
        cy.url().then((url) => {
          previousUrl = url;
        });
        cy.get('.btn').contains('Delete Article').click();
        cy.get('[class="article-preview"]').should('contain', 'No articles');
        cy.url().should((currentUrl) => {
          expect(currentUrl).not.to.equal(previousUrl);
        });
      }
    );
  });
});
