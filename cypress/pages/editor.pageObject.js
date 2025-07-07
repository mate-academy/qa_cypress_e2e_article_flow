/* eslint-disable */

export default class EditorPageObject {
  verifyUrl() {
    cy.url().should('include', '/editor');
  }

  fillAndSubmitForm(title, description, body) {
    cy.get('input[placeholder="Article Title"]').type(title);
    cy.get('input[placeholder="What\'s this article about?"]').type(
      description
    );
    cy.get('textarea[placeholder="Write your article (in markdown)"]').type(
      body
    );
    cy.get('.btn-primary').click();
  }
}
