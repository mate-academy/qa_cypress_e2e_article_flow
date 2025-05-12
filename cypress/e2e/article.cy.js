const { generateUser } = require('../support/generateUser');

describe('article', () => {
  let title;
  let description;
  let body;
  beforeEach(() => {
    const { userName, email, password } = generateUser();

    title = userName + ' title';
    description = userName + ' description';
    body = userName + ' body';

    cy.login(email, userName, password);
  });

  it('Should create an article', () => {
    cy.visit('https://conduit.mate.academy/editor');
    cy.get('[placeholder="Article Title"]').type(title);
    cy.get('[placeholder="What\'s this article about?"]').type(description);
    cy.get('[placeholder="Write your article (in markdown)"]').type(body);
    cy.get('[type="button"]').click();

    cy.get('h1').should('contain.text', title);
    cy.get('div > p').should('contain.text', body);
  });

  it('Should delete an article', () => {
    cy.createArticle(title, description, body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`article/${slug}`);
      });

    cy.contains('.btn', 'Delete Article').click();
    cy.contains('.nav-link', 'Global Feed').should('be.visible');
    cy.get('.article-preview').should('contain.text',
      'No articles are here... yet.');
  });
});
