describe("Login and article delete functions", () => {
  before(() => {
    cy.visit("https://conduit.mate.academy/user/login");
    cy.get('input[placeholder="Email"]').type("bartek@gmail.com");
    cy.get('input[placeholder="Password"]').type("bartek");
    cy.get('button[type="submit"]').click();
  });

  it("Should create an article and then delete the article", () => {
    cy.get("a").contains("New Article").click();
    cy.get('input[placeholder="Article Title"]').type("test title");
    cy.get('input[placeholder="What\'s this article about?"]').type(
      "about a test"
    );
    cy.get('textarea[placeholder="Write your article (in markdown)"]').type(
      "it is an article"
    );
    cy.get('button[type="button"]').contains("Publish Article").click();

    cy.contains("test title")
      .parent()
      .find("button.btn-outline-danger")
      .contains("Delete Article")
      .click();
  });
});
