let user;
let article;
describe('User', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('Should create an article', () => {
    cy.login(user.email,user.username, user.password);
    cy.visit('/editor');

    cy.findByPlaceholder('Article Title')
      .type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);
    cy.contains('.btn', 'Publish Article')
      .click();
  });

  it('Should delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`/article/${slug}`);
      });
    cy.get('.btn.btn-outline-danger')
      .eq(0)
      .click();
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
    cy.get('.home-page')
      .should('contain', 'Global Feed');
    cy.url()
      .should('eq', 'https://conduit.mate.academy/');
  });
});
