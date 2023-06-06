/// <reference types='cypress' />

describe('new article page', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.visit('/');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should provide an ability to create an article', () => {
    cy.login(user.email, user.username, user.password);

    cy.visit('/editor');

    cy.findByPlaceholder('Article Title')
      .type(article.title);

    cy.findByPlaceholder("What's this article about?")
      .type(article.description);

    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);

    cy.findByPlaceholder('Enter tags')
      .type(`${article.tag}{enter}`);

    cy.contains('.btn', 'Publish Article')
      .click();

    cy.get('h1')
      .should('contain', article.title);
  });

  it.only('should provide an ability to delete existing article', () => {
    cy.login(user.email, user.username, user.password);

    cy.visit('/editor');

    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const endpoint = response.body.article.slug;
        cy.visit(`article/${endpoint}`);
      });

    cy.contains('.btn', ' Delete Article')
      .click();

    cy.contains('.article-preview', 'No articles are here... yet.');
  });
});
