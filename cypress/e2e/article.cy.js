/// <reference types="cypress" />
let user;
let article;
describe("Article page", () => {
  beforeEach(() => {
    cy.task("generateUser").then((generateUser) => {
      user = generateUser;
    });

    cy.task("generateArticle").then((generateArticle) => {
      article = generateArticle;
    });
  });

  it("should provide the ability to create an article", () => {
    cy.login(user.email, user.username, user.password);

    cy.visit("https://conduit.mate.academy/editor");

    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get('[placeholder="What\'s this article about?"]').type(article.description);
    cy.get('[placeholder="Write your article (in markdown)"]').type(article.body);
    cy.contains("button", "Publish Article").click();
    cy.url().should("include", article.title);
  });

  it("should provide the ability to delete an article", () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body).then(
      (resonse) => {
        let slug = resonse.body.article.slug;
        cy.visit("https://conduit.mate.academy/article/" + slug);
        cy.contains("button", "Delete Article").click();
        cy.on("window:confirm", (window) => {
          return true;
        });
        cy.url().should("not.include", slug);
      }
    );
  });
});
