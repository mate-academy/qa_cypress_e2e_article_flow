describe('Create and delete article', () => {
  let createUser;
  let createArticle;

  beforeEach(() => {
    cy.task('generateUser').then((user) => {
      createUser = user;
    });
    cy.task('generateArticle').then((article) => {
      createArticle = article;
    });
  });

  it('should create the article', () => {
    cy.login(
      createUser.email,
      createUser.username,
      createUser.password
    );

    cy.visit('/editor');
    cy.get('input[placeholder="Article Title"]')
      .type(createArticle.title);
    cy.get('input[placeholder="What\'s this article about?"]')
      .type(createArticle.description);
    cy.get('textarea[placeholder="Write your article (in markdown)"]')
      .type(createArticle.body);
    cy.get('button[type="button"]')
      .click();
    cy.contains(createArticle.title);
    cy.contains(createArticle.body);
  });

  it('should delete the article', () => {
    cy.login(
      createUser.email,
      createUser.username,
      createUser.password
    );

    cy.createArticle(
      createArticle.title,
      createArticle.description,
      createArticle.body
    )
      .then((response) => {
        cy.visit(`/article/${response.body.article.slug}`);
        cy.get('button.btn-outline-danger')
          .eq(0).click();
        cy.on('window:confirm', (alert) => {
          expect(alert).to.equal('Do you really want to delete it?');
        });
      });
  });
});
