/// <reference types='cypress' />
describe('Check article flow', () => {
  let user;
  const title = "Title";
  const description = "Article Description";
  const body = " Article Body";
  before(() => {
    cy.visit('/user/login');
    cy.task('generateUser').then((userData) => {
      user = userData;
    });
  });
  it('should logged-in user', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('');
    
    it('should create an article', () => {
    cy.createArticle(title, description, body);
    
});
});
});