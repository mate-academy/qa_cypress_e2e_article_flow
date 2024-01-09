class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }

  get profileButton() {
    return cy.get(':nth-child(4) > .nav-link');
  }
}

export default PageObject;
