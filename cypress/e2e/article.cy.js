/// <reference types='cypress' />

describe('Article', () => {
  let profile;
  let article;

  beforeEach(() => {
    cy.visit('/user/login');
    cy.task('generateUser').then((generateUser) => {
      profile = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should create an article', () => {
    cy.login(profile.email, profile.username, profile.password);
    cy.visit('/editor');
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder("What\'s this article about?").type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)', 'textarea')
      .type(article.body);
    cy.findByPlaceholder('Enter tags').type(article.tags);
    cy.get('.btn')
      .contains('Publish Article').click();
  });

  it('should delete an article', () => {
    cy.login(profile.email, profile.username, profile.password);

    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;

        cy.visit(`article/${slug}`);
      });
    cy.contains('.btn', 'Delete Article')
      .click();
  });
});
