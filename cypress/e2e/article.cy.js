/* eslint-disable cypress/no-force */
describe('Article Testin', () => {
  let user;
  let article;
  beforeEach(() => {
    cy.visit(`/user/login`);
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task(`generateArticle`).then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.contains(`a`, `Home`).click({ force: true });
    cy.get(`[href="/profile/${user.username.toLowerCase()}"]`).should(`be.visible`);
    cy.contains(`a`, `New Article`).click();
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    cy.findByPlaceholder('Enter tags').type(article.tag);
    cy.contains(`button`, `Publish Article`).click({ force: true });
    cy.contains(`h1`, article.title).should(`be.visible`);
    cy.contains(`p`, article.body).should(`be.visible`);
    cy.contains(`li`, article.tag).should(`be.visible`);
    cy.contains(`a`, `Home`).click({ force: true });
    cy.contains(`a.link.nav-link`, `Global Feed`).click({ force: true });
    cy.contains(`p`, article.description).should(`be.visible`);
  });

  it('should delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.contains(`a`, `Home`).click({ force: true });
    cy.contains(`a`, `New Article`).click();
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    cy.findByPlaceholder('Enter tags').type(article.tag);
    cy.contains(`button`, `Publish Article`).click({ force: true });
    cy.contains(`button`, `Delete Article`).click({ force: true });
    cy.visit(`/profile/${user.username.toLowerCase()}`);
    cy.get('.article-preview')
      .should('contain.text', 'No articles are here... yet.');
  });
});
