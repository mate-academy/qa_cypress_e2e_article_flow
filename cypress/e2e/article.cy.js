describe('', () => {
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

  it('Should have abbility to create the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('[placeholder="Article Title"]')
      .type(article.title);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(article.description);
    cy.get('[ placeholder="Write your article (in markdown)"]')
      .type(article.body);
    cy.contains('.btn', 'Publish Article')
      .click();
    cy.contains('.container', article.title)
      .should('exist');
  });

  it('should be deleted', () => {
    cy.login(user.email, user.username, user.password);

    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;

        cy.visit(`article/${slug}`);
      });

    cy.contains('.btn', 'Delete Article')
      .click();

    cy.get('.article-preview')
      .should('contain', 'No articles are here');
  });
});
