describe('', () => {
  let articleTitle;
  let uniqueUsername;
  beforeEach(() => {
    uniqueUsername = 'user' + Cypress._.random(0, 9999);
    const uniqueEmail = uniqueUsername + '@example.com';
    const uniquePassword = 'password' + Cypress._.random(0, 9999);
    articleTitle = 'Test Article ' + Cypress._.random(0, 9999);
    const articleDescription = 'This is a test article.';

    cy.login(uniqueEmail, uniqueUsername, uniquePassword);
    cy.createArticle(articleTitle, articleDescription,
      'This is my test article');
  });

  it('should create an article', () => {
    cy.visit('https://conduit.mate.academy/');
    cy.get('a[class = "link nav-link"]')
      .should('contain.text', 'Global Feed').click();
    cy.contains(articleTitle, { timeout: 10000 }).should('exist');
  });

  it('should delete the article', () => {
    cy.visit(`https://conduit.mate.academy/profile/${uniqueUsername}`);
    cy.contains('h1', articleTitle).click();
    cy.contains('button', 'Delete Article').click();
    cy.get('a[class = "link nav-link"]')
      .should('contain.text', 'Global Feed').click();
    cy.contains('h1', articleTitle).should('not.exist');
  });
});
