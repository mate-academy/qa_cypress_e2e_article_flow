
describe('Article Flow', () => {
  let user;
  let articleData;
  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      articleData = generateArticle;
    });
    cy.visit('');
  });

  it('should create the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('[placeholder="Article Title"]')
      .type(articleData.title);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(articleData.description);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(articleData.body);
    cy.contains('.btn', 'Publish Article')
      .click();
    cy.get('h1')
      .should('contain', articleData.title);
    cy.get('.article-page')
      .should('contain', articleData.body);
  });

  it('should delete the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(articleData.title, articleData.description, articleData.body)
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
