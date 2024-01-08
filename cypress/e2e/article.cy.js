describe('', () => {
  let article;
  let user;
  beforeEach(() => {
    cy.task('createArticle').then((createArticle) => {
      article = createArticle;
    });
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('Should Create the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('[placeholder="Article Title"]').type(article.title);
    // eslint-disable-next-line max-len
    cy.get('[placeholder="What\'s this article about?"]').type(article.description);
    // eslint-disable-next-line max-len
    cy.get('[placeholder="Write your article (in markdown)"]').type(article.body);
    cy.get('[type="button"]').contains('Publish').click();
    cy.url().should('contain', article.title);
  });

  it('Should Delete the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description,
      article.body).then((response) => {
      const slug = response.body.article.slug;
      cy.visit(`/article/${slug}`);
    });
    cy.contains('.btn', 'Delete Article').click();
    cy.on('window:confirm', (alertText) => {
      expect(alertText).to.equal('Do you really want to delete it?');
    });
    cy.on('window:confirm', () => true);
    cy.get('.article-preview').should('contain', 'No articles are here...');
  });
});
