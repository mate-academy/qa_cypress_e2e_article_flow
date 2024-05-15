describe('Cypress: Article flow', () => {
  let users;
  let articl;
  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      users = generateUser;
    });
    cy.task('generateArticl').then((generateArticl) => {
      articl = generateArticl;
    });
  });
  it('Create the article', () => {
    cy.login(users.email, users.username, users.password);
    cy.visit(`/profile/${users.username}`);
    cy.url().should('contain', users.username);
    cy.createArticle(articl.title, articl.description,
      articl.body, articl.tagList)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit('article/' + slug);
        cy.url().should('contain', articl.title);
        cy.get('h1').should('contain', articl.title);
        cy.get('div > p').should('contain', articl.body);
      });
  });

  it('Delete the article', () => {
    cy.login(users.email, users.username, users.password);
    cy.visit(`/profile/${users.username}`);
    cy.url().should('contain', users.username);
    cy.createArticle(articl.title, articl.description,
      articl.body, articl.tagList)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit('article/' + slug);
        cy.url().should('contain', articl.title);
        cy.get('h1').should('contain', articl.title);
        cy.get('div > p').should('contain', articl.body);
      });
    cy.get('.btn-outline-danger').contains('Delete Article').click();
    cy.visit(`/profile/${users.username}`);
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  });
});
