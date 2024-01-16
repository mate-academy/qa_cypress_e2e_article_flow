export class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }

  assertUrlNotInclude(url) {
    cy.url().should('not.include', url);
  }
};
