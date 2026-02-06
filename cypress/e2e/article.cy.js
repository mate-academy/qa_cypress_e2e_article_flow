/// <reference types="cypress"/>

describe('article\'s flow testing', () => {
  let article;
  let user;

  beforeEach(() => {
    cy.task('generateUser').then((u) => {
      user = u;
      cy.login(user.email, user.username, user.password);
    });
    cy.task('generateArticle').then((a) => {
      article = a;
    });
  });

  it('should create article', () => {
    cy.visit('/');
    cy.contains('a.nav-link', 'New Article').click();
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);

    cy.contains('button', 'Publish Article').click();

    cy.contains('.author', user.username.toLowerCase());
    cy.contains('h1', article.title).should('be.visible');
  });

  it('should delete article', () => {
    cy.createArticle(article.title, article.description, article.body);
    cy.visit('/');
    cy.contains('.nav-link', 'Global Feed').click();
    cy.contains('a.preview-link h1', article.title).click();
    cy.contains('button', ' Delete Article').click();

    cy.get('a.preview-link h1').should((els) => {
      const texts = [...els].map((el) => el.textContent);
      expect(texts).to.not.include(article.title);
    });
  });
});
