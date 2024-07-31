const { generateArticle } = require("../support/commands");

describe("Article flow", () => {
  const article = generateArticle();
  let articleUrl;
  const user = {
    name: "qwerty1991",
    email: "qwerty1991@gmail.com",
    password: "1111",
  };
  beforeEach(() => {
    cy.login(user.email, user.password);
    cy.visit('/');
    cy.contains(".nav-link", user.name).should('be.visible');
  });

  it("Create the article", () => {
    cy.contains(".nav-link", "New Article").click();
    cy.url().should("contain", "/editor");
    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get('[placeholder="What\'s this article about?"]').type(article.description);
    cy.get('[placeholder="Write your article (in markdown)"]').type(article.body);
    cy.get('[placeholder="Enter tags"]').type(article.tag).type('{enter}');
    cy.contains('[type="button"]', "Publish").click();

    cy.get("h1").should('contain', article.title);
    cy.url().should('contain', article.title);
    cy.url().then(createdArticleUrl => {
      articleUrl = createdArticleUrl;
    });
  });

  it("Delete the article", () => {
    cy.visit(articleUrl);
    cy.contains(".btn", "Delete Article").click();
    cy.url().should("not.include", "/article");
  });
});
