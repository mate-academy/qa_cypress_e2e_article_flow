const { generateData } = require('../support/generateData');

describe('conduit', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.visit('/');

    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      const { email, username, password } = user;

      cy.contains('.nav-link', 'Sign up').click();
      cy.login(email, username, password);
    });

    article = generateData();
  });

  it('should create a new article', () => {
    cy.contains('.nav-link', 'New Article').click();
    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(article.description);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(article.body);

    cy.contains('.btn', 'Publish Article').click();
    cy.contains('h1', article.title).should('exist');
  });

  it('should delete the article', () => {
    cy.createArticle(article.title, article.description, article.body)
      .then(() => {
        cy.visit('/');

        cy.contains('.nav-link', 'Global Feed').click();
        cy.contains('.preview-link', article.title).click();
        cy.url().should('match', new RegExp(article.title.replace(/\s+/g, '-').toLowerCase()));

        cy.contains('.btn', 'Delete Article').click();
        cy.url().should('not.contain', new RegExp(article.title.replace(/\s+/g, '-').toLowerCase()));
      });
  });
});
