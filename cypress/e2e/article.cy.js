describe('Article flow', () => {
  let article;
  let postedArticleUrl;
  beforeEach(() => {
    cy.task('generateUser').then(({ email, username, password }) => {
      cy.login(email, username, password);
    });
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle; 
    });
  });

  it('should provide an ability to create the article', () => {
    cy.visit('/editor');
    cy.findByPlaceholder('Article Title')
      .type(article.title)
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description)
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.text)
    cy.contains('.btn', 'Publish Article')
      .click();
    cy.get('h1')
      .should('contain', article.title);
    cy.get('.col-md-12')
      .should('contain', article.text);
    cy.get('.btn')
      .should('contain', 'Edit Article');
    cy.get('.btn')
      .should('contain', 'Delete Article');
  });
  

  it('should provide an ability to delete the article', () => {
    cy.createArticle(
      article.title,
      article.description,
      article.text
    ).then(response => {
      cy.visit(`article/${response.body.article.slug}`);
      cy.contains('Delete Article')
        .eq(0)
        .click();
      cy.on('window:confirm', (confirm) => {
        expect(confirm).to.equal(`Do you really want to delete it?`)
        return true;
      cy.get('.article-preview')
        .should('contain', 'No articles are here... yet.');
      });
    })
  });
});
