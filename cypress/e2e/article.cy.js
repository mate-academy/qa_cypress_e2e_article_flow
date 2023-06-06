/// <reference types='cypress' />

describe('New Article page', () => {
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
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);
    cy.findByPlaceholder('Enter tags')
      .type(`${article.tag}{enter}`);
    cy.contains('.btn', 'Publish Article')
      .click();
    cy.get('h1')
      .should('contain', article.title);
    cy.get('.col-md-12')
      .should('contain', article.body);
    cy.get('.tag-list')
      .should('contain', article.tag);
    cy.get('.btn.btn-outline-secondary')
      .should('exist');
  });

  it('should provide an ability to delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`article/${slug}`);
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
