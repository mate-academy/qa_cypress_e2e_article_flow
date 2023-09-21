describe('', () => {
  let user;
  let article;
  beforeEach(() => {
    cy.task('generateUser').then(generateUser => {
    user = generateUser;
})
    cy.login(user.email, user.username, user.password);
    cy.task('generateArticle').then(generateArticle => {
    article = generateArticle;
})
  });

  it('should provide an ability to create new article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get('[placeholder="What\'s this article about?"]').type(article.description);
    cy.get('[placeholder="Write your article (in markdown)"]').type(article.body);
    cy.get('[placeholder="Enter tags"]').type(article.tagList);
  });

  it('should provide an ability to delete the created article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body, article.tagList);
    cy.visit('/article');
    cy.contains('.btn btn-outline-danger btn-sm', 'Delete Article').click();
    cy.on('window:confirm', (alert) => {
      expect(alert).to.equal('Do you really want to delete it?'), {enter};
  });
})
});
