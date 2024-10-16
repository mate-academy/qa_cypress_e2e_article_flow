describe('Article flow', () => {
  let user;
  let articleData;

  beforeEach(() => {
    cy.visit('');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      articleData = generateArticle;
    });
  });

  it('should allow for the creation of an article.', () => {
    cy.login(user.email, user.username, user.password);

    cy.visit('/editor');

    cy.findByPlaceholder('Article Title').type(articleData.title);

    cy.findByPlaceholder('What\'s this article about?')
      .type(articleData.description);

    cy.findByPlaceholder('Write your article (in markdown)')
      .type(articleData.body);

    cy.contains('.btn', 'Publish Article').click();

    cy.contains('.container', articleData.title).should('exist');
  });

  it('should allow for the deletion of the article', () => {
    cy.login(user.email, user.username, user.password);

    cy.createArticle(articleData.title,
      articleData.description, articleData.body)
      .then((response) => {
        const slug = response.body.article.slug;

        cy.visit(`article/${slug}`);
      });

    cy.contains('.btn', 'Delete Article').eq(0).click();

    cy.contains('.nav-link', 'Global Feed')
      .should('be.visible');

    cy.get('.article-preview')
      .should('contain.text', 'No articles are here... yet');
  });
});
