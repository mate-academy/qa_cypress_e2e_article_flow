/* eslint-disable max-len */
describe('Articles', () => {
  let user;
  let article;
  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
    cy.visit('/');
  });

  it('should provide an ability to create new article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);
    cy.findByPlaceholder('Enter tags')
      .type(article.tags);
    cy.get('.btn.btn-lg').contains('Publish Article').should('exist').click();
    cy.get('.btn.btn-lg').contains('Publish Article').should('exist').click();
    cy.get('.banner').should('contain', article.title);
  });

  it('should provide an ability to delete article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`/article/${slug}`);
      });
    cy.get('.btn').contains('Delete Article').should('exist').click();
    cy.get('.article-preview').should('contain', 'No articles are here... yet.');
  });
});
