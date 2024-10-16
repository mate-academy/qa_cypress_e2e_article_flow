let user;
let article;

describe('Conduit article flow', () => {
  beforeEach(() => {
    cy.visit('');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('Should create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');

    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('What\'s this').type(article.description);
    cy.findByPlaceholder('Write your').type(article.body);

    cy.get('[type="button"]').click();
  });

  it('Should delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;

        cy.visit(`article/${slug}`);
        cy.contains('.btn', 'Delete Article').click();
        cy.contains('.nav-link', 'Global Feed').should('be.visible');
      });
  });
});
