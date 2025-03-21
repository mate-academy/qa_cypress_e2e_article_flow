describe('', () => {
  let user;
  let article;

  const articleTitlePlaceholder = 'Article Title';
  const articleDescriptionPlaceholder = 'What\'s this article about?';
  const articleBodyPlaceholder = 'Write your article (in markdown)';

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('Should create article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/');
    cy.get('a').contains('New Article').click();
    cy
      .get(`input[placeholder="${articleTitlePlaceholder}"]`)
      .type(article.title);
    cy
      .get(`input[placeholder="${articleDescriptionPlaceholder}"]`)
      .type(article.description);
    cy
      .get(`textarea[placeholder="${articleBodyPlaceholder}"]`)
      .type(article.body);
    cy.get('button.btn-primary').click();

    cy.get('h1').should('contain', article.title);
    cy.get('.article-content').should('contain', article.body);
    cy.url().should('include', '/article/');
  });

  it('Should delete article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/');
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        cy.visit(`/article/${response.body.article.slug}`);
        cy.get('.btn').contains('Delete Article').click();
        cy.on('window:confirm', (str) => {
          expect(str).to.equal('Do you really want to delete it?');
        });
        cy.url().should('equal', 'https://conduit.mate.academy/');
      });
  });
});
