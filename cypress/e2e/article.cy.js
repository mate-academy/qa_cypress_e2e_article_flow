/// <reference types = "cypress" />
/// <reference types = "../support" />

describe('New article form', () => {
  let user;
  let article;

  before(() => {

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should provide the ability to create an article', () => {
    
    cy.login(user.username, user.email, user.password);
    cy.visit('/editor');
    
    cy.get('[placeholder="Article Title"]')
      .type(article.title);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(article.description);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(article.body);
    cy.get('[placeholder="Enter tags"]')
      .type(article.tag)
    cy.contains('.btn', 'Publish')
      .click().click();
    
    cy.contains('.container', article.title);
    cy.contains('.col-md-12', article.body);
    cy.contains('.tag-list', article.tag);

    cy.contains('.btn', 'Edit Article')
  });

  it('should provide the ability to delete an article', () => {
    cy.visit('/')
    cy.createArticle(
      user.username, 
      user.email, 
      user.password, 
      article.title, 
      article.description, 
      article.body
      ).then((response) => {
        const slug = response.body.article.slug;

        cy.visit(`/article/${slug}`)
        cy.contains('.btn', 'Delete Article')
        .click();
      });
  });
});
