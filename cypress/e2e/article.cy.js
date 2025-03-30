describe('Article flow', () => {
  let user;
  let article;
  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });
  it.only('the user should be able to create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get(`[placeholder="What's this article about?"]`).type(article.body);
    cy.get('[placeholder="Write your article (in markdown)"]').type(article.description);
    cy.get('.btn').contains('Publish Article').click();

    cy.get('[class="hide-text user-pic"]').click();
    cy.get('[class="preview-link"]').should('contain', article.title, article.description, article.body);
  });

  it('the user should be able to delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`article/${slug}`);
      });
    cy.contains('.btn', 'Delete Article').click();

    cy.get('.article-preview').should('contain', 'No articles are here');
  });
});
