describe('CRUD article', () => {
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
    cy.login(user.email, user.username, user.password);
  });

  it('should create the article', () => {
    cy.visit('/editor');
    cy.contains('.nav-link', 'New Article').click();
    cy.get('[placeholder="Article Title"]')
      .type(articleData.title);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(articleData.description);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(articleData.body);
    cy.contains('.btn', 'Publish Article')
      .click();
    cy.contains('.container', articleData.title)
      .should('exist');
  });
  it('should delete the article', () => {
    cy.createArticle(articleData.title,
      articleData.description, articleData.body)
      .then((response) => {
        const slug = response.body.article.slug;

        cy.visit(`article/${slug}`);
      });
    cy.contains('.btn', 'Delete Article').eq(0).click();
    cy.url().should('include', '/');
    cy.contains('.nav-link', 'Global Feed')
      .should('be.visible');
    cy.get('.article-preview')
      .should('contain.text', 'No articles are here... yet');
  });
});
