describe('Conduit app', () => {
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

  it('login', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('[placeholder="Article Title"]')
      .type(article.title)
      .should('have.value', article.title);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(article.description)
      .should('have.value', article.description);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(article.body)
      .should('have.value', article.body);
    cy.get('[placeholder="Enter tags"]')
      .type(article.tag)
      .should('have.value', article.tag)
    cy.get('.btn')
      .click()
      .should('be.visible');
    cy.get('.btn')
      .should('contain', 'Publish Article');
  });

  it('Delete', () => {
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
