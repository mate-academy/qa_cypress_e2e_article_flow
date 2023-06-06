/// <reference types= "cypress" />

describe('', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should provide an ability to create an article', () => {
    cy.login(user.email ,user.username, user.password);
    cy.visit('/editor');

    cy.getPlaceholder('Article Title')
      .type(article.title);
    cy.getPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.getPlaceholder('Write your article (in markdown)')
      .type(article.body);
    cy.contains('.btn', 'Publish Article')
      .click();
  });

  it('should provide an ability to delete an article', () => {
    cy.login(user.email ,user.username, user.password);

    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;

        cy.visit(`/article/${slug}`);
        cy.contains('.btn', ' Delete Article')
          .eq(0)
          .click();
      });
  });
});
