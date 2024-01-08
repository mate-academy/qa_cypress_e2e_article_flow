describe('Article Creation Test', () => {

  let user;
  let article;

  beforeEach(() => {
    cy.visit('/');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
   
 cy.task('genetareArticle').then(generateArticle => {
      article = generateArticle;
    })
  });

  

  it('should logs in and create an article', () => {
    cy.contains('Sign up').click();
   cy.get('[placeholder="Username"]').type(user.username);
   cy.get('[placeholder="Email"]').type(user.email);
   cy.get('[placeholder="Password"]').type(user.password);
   cy.get('[type="submit"]').click();
  cy.get('[class="navbar navbar-light"]').should('contain',user.username);

  cy.get('[href="/editor"]').click();
  cy.get('[placeholder="Article Title"]').type(generateArticle.title);
  cy.get('[placeholder="What\'s this article about?"]').type(generateArticle.description);
  cy.get('[placeholder="Write your article (in markdown)"]').type(generateArticle.body);
  cy.get('[placeholder="Enter tags"]').type(generateArticle.tag);
  cy.contains('Publish Article').click();
  cy.get('[class="author"]').should('contain', generateArticle.title);
});

  it.only('should provide to delete article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body, article.tagList);
    cy.contains('Delete Article').click();
    cy.window().then((win) => {
    cy.stub(win, 'confirm').returns(true);
    });
});
});
