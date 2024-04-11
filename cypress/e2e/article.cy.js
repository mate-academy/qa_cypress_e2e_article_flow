describe("Conduit app", () => {
  let user;
  let article;

  before(() => {
    // cy.visit("https://conduit.mate.academy/");
    cy.task("generateUser").then((newUser) => {
      user = newUser;
    });
    cy.task("generateArticle").then((generateArticle) => {
      article = generateArticle;
    });
  });

  it("should create a new article", () => {
    cy.login(user.email, user.username, user.password);
    cy.visit("/editor");
    cy.findByPlaceholder("Article Title").type(article.title);
    cy.findByPlaceholder("What's this article about?").type(
      article.description
    );
    cy.findByPlaceholder("Write your article (in markdown)").type(article.body);
    cy.findByPlaceholder("Enter tags").type(article.tags);
    cy.get(".btn.btn-lg.pull-xs-right.btn-primary").click().click();
    cy.get(".banner").should("contain", article.title);
  });

  it("should delete an article", () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body).then(
      (response) => {
        const slug = response.body.article.slug;
        cy.visit(`/article/${slug}`);
      }
    );
    cy.get(".ion-trash-a").first().click();
    cy.get('[alt="your profile image"]').click();
    cy.get(".article-preview").should("contain", "No articles are here... yet");
  });
});
