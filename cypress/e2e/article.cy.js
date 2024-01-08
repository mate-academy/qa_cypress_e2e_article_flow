/// <reference types='cypress' />

describe('Article page', () => {
  let user;
  let article;
  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
    cy.visit('/');
  });

  it('should provide an ability to create new article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.findByyPlaceholder('Article Title').type(article.title);
    cy.findByyPlaceholder(`What's this article about?`)
      .type(article.description);
    cy.findByyPlaceholder('Write your article (in markdown)')
      .type(article.body);
    cy.findByyPlaceholder('Enter tags')
      .type(article.tags);
    cy.contains('.btn.btn-lg', 'Publish').click();
    cy.contains('.btn.btn-lg', 'Article').click();
    cy.get('[class="banner"]').should('contain', article.title);
  });

  it('should provide an ability to delete the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.desciption, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`/article/${slug}`);
      });
    cy.contains('button', ' Delete Article').click();
    cy.on('window:confirm', (confirm) => {
      expect(confirm).to.equal(`Do you really want to delete it?`);
    });

    cy.on('window:confirm', () => true);
    cy.get('[alt="your profile image"]').click();
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  });
});
