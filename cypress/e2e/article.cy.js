describe('Article flow', () => {
  const randomId = Math.floor(Math.random() * 1000000);
  const email = `user${randomId}@test.com`;
  const username = `user${randomId}`;
  const password = 'Password123!';
  const articleTitle = `Test Article ${randomId}`;
  const articleDescription = 'This is a test description';
  const articleBody = 'This is the body of the test article';

  before(() => {
    cy.login(email, username, password);
  });

  it('should create a new article', () => {
    cy.visit('/editor');

    cy.get('input[placeholder="Article Title"]').type(articleTitle);
    cy.get('input[placeholder="What\'s this article about?"]')
      .type(articleDescription);
    cy.get('textarea[placeholder="Write your article (in markdown)"]')
      .type(articleBody);
    cy.contains('button', 'Publish Article').click();

    cy.url().should('include', '/article/');
    cy.get('h1').should('contain.text', articleTitle);
  });

  it('should delete the article', () => {
    cy.createArticle(articleTitle, articleDescription, articleBody)
      .then((article) => {
        const slug = article.slug;

        cy.visit(`/article/${slug}`);

        cy.contains('button', 'Delete Article').click();

        cy.location('pathname').should('eq', '/');

        cy.request({
          url: `/api/articles/${slug}`,
          failOnStatusCode: false
        }).its('status').should('eq', 404);
      });
  });
});
