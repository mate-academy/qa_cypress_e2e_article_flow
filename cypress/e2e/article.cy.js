import { generateRandomArticle } from '../support/generateRandomArticle';

describe('Articles management', () => {
  beforeEach(() => {
    cy.task('generateUser').then(({ email, username, password }) =>
      cy.login(email, username, password)
    );
    cy.visit('/');
  });

  afterEach(() => {
    cy.visit('/settings');
    cy.contains('.btn', 'Or click here to logout.').click();
  });

  it('Should allow to create an article', () => {
    const { title, description, body } = generateRandomArticle();

    cy.createArticle(title, description, body);
    cy.visit('/');
    cy.contains('a', 'Global Feed').click();
    cy.contains('h1', title).should('exist');
  });

  it('Should allow to delete created article', () => {
    const { title, description, body } = generateRandomArticle();

    cy.createArticle(title, description, body);

    cy.visit('/');
    cy.contains('a', 'Global Feed').click();
    cy.contains('h1', title).click();
    cy.contains('.btn', ' Delete Article');
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Do you really want to delete it?`);
    });
    cy.visit('/');
    cy.contains('a', 'Global Feed').click();
    cy.contains('h1', title).should('not.exist');
  });
});
