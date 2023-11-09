describe('Article flow on the Conduit app', () => {
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

  it('should sign in and create a new article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('[placeholder="Article Title"]')
      .type(article.title)
    cy.get('[placeholder="What\'s this article about?"]')
      .type(article.description)
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(article.body)
    cy.get('[placeholder="Enter tags"]')
      .type(article.tag)
    cy.get('.btn')
      .click()
      .should('be.visible');
    cy.get('.btn')
      .should('contain', 'Publish Article');
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        cy.visit(`article/${response.body.article.slug}`);
        cy.get('h1')
        .should('contain', article.title);
        cy.contains('.btn', 'Edit Article')
        .should('be.visible');
        cy.contains('.btn', 'Delete Article')
        .should('be.visible');
        cy.get('p')
        .should('contain', article.body);
      });
  });

  it('should sign in and able to delete the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        cy.visit(`article/${response.body.article.slug}`);
        cy.get('.btn').contains('Delete Article').click();
        cy.get('.article-preview')
          .should('contain', 'No articles are here... yet.');
      });
  });
});
