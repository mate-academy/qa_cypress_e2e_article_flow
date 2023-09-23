describe('Article page', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('generateUser').then(generateUser =>{
      user = generateUser;
    }); 
    cy.task('generateArticle').then(generateArticle =>{
      article = generateArticle;
    });
  });

  it(' should allow to create the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get('[placeholder^="What\'s this"]').type(article.description);
    cy.get('[placeholder^="Write your"]').type(article.body);
    cy.get('[type="button"]').click();
    cy.get('.article-page').should('contain', article.title);
    cy.get('.article-content').should('contain', article.body);
  });

  it(' should allow to delete the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
      cy.visit(`article/${response.body.article.slug}`);
      cy.get('.article-actions .ion-trash-a').click();
      cy.get('.article-preview').should('contain', 'No articles are here... yet.');
    });

  });
});

