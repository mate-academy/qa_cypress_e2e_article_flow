const { faker } = require("@faker-js/faker");

function generateArticleData() {
  return {
    title: faker.lorem.sentence(),
    description: faker.lorem.sentences(2),
    content: faker.lorem.paragraphs(2),
    tags: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
  };
}

describe("should create and delete article", () => {
  let user;

  before(() => {
    const email = faker.internet.email();
    const username = (
      faker.helpers.replaceSymbols("?", {
        symbols: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
      }) +
      faker.internet
        .userName()
        .replace(/[^A-Za-z0-9_-]/g, "")
        .replace(/^[^A-Za-z]+/, "")
    ).toLowerCase();
    const password = faker.internet.password();

    cy.visit("https://conduit.mate.academy/");
    cy.login(email, username, password).then(() => {
      user = { username, email, password };
    });
  });

  it("should create article", () => {
    const article = generateArticleData();
    cy.visit("https://conduit.mate.academy/editor");

    cy.get('input[placeholder="Article Title"]').type(article.title);
    cy.get(`input[placeholder="What's this article about?"]`).type(
      article.description,
    );
    cy.get("textarea").type(article.content);
    article.tags.forEach((tag) => {
      cy.get('input[placeholder="Enter tags"]').type(tag + "{enter}");
    });
    cy.get("button").click();
    cy.contains("h1", article.title);
  });

  it("should delete article", () => {
    const { title = "", description, content } = generateArticleData();
    cy.createArticle(title, description, content);
    cy.visit(`https://conduit.mate.academy/profile/${user.username}`);
    cy.contains("h1", title).click();
    cy.on("window:confirm", () => true);
    cy.contains("button", "Delete Article").click();
    cy.visit(`https://conduit.mate.academy/profile/${user.username}`);
    cy.contains(title).should("not.exist");
  });
});
