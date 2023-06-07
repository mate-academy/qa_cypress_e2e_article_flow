describe('Article', () => {
  let user;
  let articleTest;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateArticle').then((generateArticle) => {
      articleTest = generateArticle;
    });

    cy.visit('');
  });

  it('The article should be created', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('[placeholder="Article Title"]').type(articleTest.title);
    cy.get('[placeholder="What\'s this article about?"]').type(articleTest.description);
    cy.get('[placeholder="Write your article (in markdown)"]').type(articleTest.body);
    cy.contains('.btn', 'Publish Article').click();
    cy.contains('.container', articleTest.title).should('exist');
  });

  it('The article should be deleted', () => {
    cy.login(user.email, user.username, user.password);

    cy.createArticle(articleTest.title, articleTest.description, articleTest.body).then((response) => {
      const slug = response.body.article.slug;
      cy.visit(`/article/${slug}`);
    });

    cy.contains('.btn', 'Delete Article').click();
    cy.get('.article-preview').should('contain', 'No articles are here');
  });
});