/// <reference types="cypress" />

describe("Article flow", () => {
  const timestamp = Date.now();
  const email = `user${timestamp}@test.com`;
  const username = `user${timestamp}`;
  const password = `Password123!`;

  before(() => {
    cy.login(email, username, password);
    cy.get("nav").contains(username).should("be.visible");
  });

  it("should create a new article", () => {
    cy.fixture("example.json").then((article) => {
      const title = `${article.name} ${timestamp}`;
      const description = `${article.email} ${timestamp}`;
      const body = `${article.body} ${timestamp}`;

      cy.visit("https://conduit.mate.academy/editor");
      cy.get('input[placeholder="Article Title"]').type(title);
      cy.get('input[placeholder="What\'s this article about?"]').type(
        description
      );
      cy.get('textarea[placeholder="Write your article (in markdown)"]').type(
        body
      );
      cy.contains("button", "Publish Article").click();
      cy.get("h1").should("contain.text", title);
    });
  });

  it("should delete an article", () => {
    cy.fixture("example.json").then((article) => {
      const title = `${article.name} ${timestamp}`;
      const description = `${article.email} ${timestamp}`;
      const body = `${article.body} ${timestamp}`;

      cy.createArticle(title, description, body);
      cy.visit(`https://conduit.mate.academy/@${username}`);
      cy.contains("h1", title).click();
      cy.contains("button", "Delete Article").click();
      cy.get("body").should("not.contain", title);
    });
  });
});
