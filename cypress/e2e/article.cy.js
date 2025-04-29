/// <reference types='cypress' />

describe('Create article Flow', () => {
  let newUser;
  before(() => {
    cy.task('generateUser').then((user) => {
      newUser = user;
      cy.login(newUser.username, newUser.email, newUser.password);
      cy.visit('/');
    });
  });

  it('should be able to create a new article', () => {
    cy.contains('a', ' New Article').click();
    cy.get('input[placeholder="Article Title"]')
      .type('April Cypress create2');
    cy.get('input[placeholder="What\'s this article about?"]')
      .type('Cypress title create2');
    cy.get('textarea[placeholder="Write your article (in markdown)"]')
      .type('April Cypress content2');
    cy.contains('button', 'Publish Article').click();
    cy.get('div.banner')
      .should('contain.text', 'April Cypress create2');
    cy.get('div.row.article-content')
      .should('contain.text', 'April Cypress content2');
    cy.contains('a', 'Edit Article')
      .should('be.visible');
  });
});

describe('Delete article Flow', () => {
  let newUser;
  const article = {
    title: 'April Cypress Title1',
    description: 'April Cypress about1',
    body: 'April Cypress content1'
  };

  before(() => {
    cy.task('generateUser').then((user) => {
      newUser = user;
      cy.login(newUser.username, newUser.email, newUser.password);
      cy.createArticle(article.title, article.description, article.body);
      cy.visit('/');
    });
  });

  it('should be able to delete a article', () => {
    cy.contains('a', 'Global Feed').click();
    cy.contains('a', article.title).click();
    cy.contains('button', 'Delete Article').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('Do you really want to delete it?');
    });
  });
});
