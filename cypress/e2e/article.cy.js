describe('Article flow', () => {
  let user;
  let article;

  before(() => {
    cy.visit(`/user/login`);
    
    cy.task('generateUser').then((generateUser =>{
      user = generateUser;
    }));

    cy.task('generateArticle').then((generateArticle =>{
      article = generateArticle;
    }));

  });

  it.skip('should create an article', () => {
    cy.login(user.email, user.username, user.password);
  
    cy.visit('/editor');
  
    cy.findByPlaceholder('Article Title').type(article.title);
  
    cy.findByPlaceholder('What\'s this article about?').type(article.description);
  
    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
  
    cy.findByPlaceholder('Enter tags').type(article.tag);
  
    cy.get('[type="button"]').click({force: true});
  
    cy.contains('h1', article.title).should('be.visible');
  
    cy.url().should('include', 'article');  
  });
  it('should delete the article', () => {
    cy.login(user.email, user.username, user.password);
  
    cy.createArticle(article.title,
      article.description,
      article.body,
      article.tag).then((response) => {
      const slug = response.body.article.slug;
      cy.visit(`/article/${slug}`);
    });
  
    cy.contains('button', 'Delete Article').click();
  
    cy.get('.article-preview').should('contain', 'No articles are here... yet.');
  });
});
