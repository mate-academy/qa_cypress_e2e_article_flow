describe('The Article page', () => {
  let user;
  let article;
  beforeEach(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
  });

  it('should allow creating an article', () => {
    cy.login(user);
    cy.visit('/editor');
    
    cy.findByPlaceholder("Article Title").type(article.title);
    cy.findByPlaceholder("What's this article about?").type(article.description);
    cy.findByPlaceholder("Write your article (in markdown)").type(article.body);
    cy.contains('[type="button"]', 'Publish Article').click();


    cy.checkArticle(article, user);
  });

  it('should allow deleting an article', () => {
    cy.login(user);
  
    cy.createArticle(article).then(response => {
      const slug = response.body.article.slug;

      cy.visit(`/article/${slug}`);
    });

    cy.deleteArticle(article, user);
  
    cy.checkArticleDeleted(article, user);
  });
});
