export class PageObject {
  visit(url) {
    return cy.visit(url || this.url);
  };
};
