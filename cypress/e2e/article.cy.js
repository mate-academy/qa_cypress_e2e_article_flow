describe('Should provide the ability to work with article', () => {
  let user;
  let article;
  beforeEach(() => {
    cy.visit('/');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should provide the ability to create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('[placeholder="Article Title"]')
      .type(article.title);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(article.description);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(article.body);
    cy.contains('button', 'Publish Article')
      .click();

    cy.get('h1')
      .should('contain', article.title);
    cy.get('.col-md-12')
      .should('contain', article.body);
  });

  it('should provide the ability to delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`/article/${slug}`);
        cy.contains('.btn', 'Delete Article')
          .click();
        cy.get('.article-preview')
          .should('contain', 'No articles');
      });
  });
});
