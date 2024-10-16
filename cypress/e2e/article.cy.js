/// <reference types='cypress' />

let user;
let article;
describe('Conduit', () => {
  beforeEach(() => {
    cy.visit('');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should login and create article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get('[placeholder="What\'s this article about?"]').type(article.desc);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(article.body);
    cy.contains('.btn', 'Publish Article').click();

    cy.contains('.container', article.title).should('exist');
  });

  it('should delete the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.desc, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`article/${slug}`);
      });
    cy.contains('.btn', 'Delete Article').click();

    cy.contains('.nav-link', 'Global Feed').should('be.visible');
  });
});
