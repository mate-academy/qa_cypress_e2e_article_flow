describe('Article', () => {
  let user;
  let articleTest;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.password);
    });

    cy.task('generateArticle').then((generateArticle) => {
      articleTest = generateArticle;
    });
  });

  it('should create an article', () => {
    cy.visit('/editor');
    cy.get('[placeholder="Article Title"]').type(articleTest.title);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(articleTest.description);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(articleTest.body);
    cy.contains('.btn', 'Publish Article').click();

    cy.contains('.container', articleTest.title).should('exist');
  });

  it('should delete an article', () => {
    cy.login(user.email, user.password);

    cy.getCookie('auth').should('exist');

    cy.createArticle(articleTest.title, articleTest.description,
      articleTest.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`/article/${slug}`);
        cy.contains('.btn', 'Delete Article').click();
        cy.get('.article-preview').should('contain', 'No articles are here');
        cy.visit('/');
        cy.contains('.article-preview', articleTest.title)
          .should('not.exist');
      });
  });
});
