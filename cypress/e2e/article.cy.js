describe('Create and Delete Article Test', () => {
  const uniqueUsername = `user${Math.floor(Math.random() * 100000)}`;
  const uniqueEmail = `${uniqueUsername}@example.com`;
  const uniquePassword = 'password123';
  const uniqueTitle = `Unique Article ${Math.floor(Math.random() * 100000)}`;
  const uniqueDescription = 'This is a unique article for testing purposes.';

  it('should create and delete an article', () => {
    cy.visit('https://conduit.mate.academy/user/register');
    cy.get(':nth-child(1) > .form-control').click().type(uniqueUsername);
    cy.get(':nth-child(2) > .form-control').click().type(uniqueEmail);
    cy.get(':nth-child(3) > .form-control').click().type(uniquePassword);
    cy.get('.btn').click();
    cy.get('.container > .nav > :nth-child(2) > .nav-link').click();
    cy.visit('https://conduit.mate.academy/editor');
    cy.get(':nth-child(1) > .form-control').click().type(uniqueTitle);
    cy.get(':nth-child(2) > .form-control').click().type(uniqueDescription);
    cy.get(':nth-child(3) > .form-control').click().type('This is the body of the article.');
    cy.get('.btn').click();
    cy.get('.article-actions > .article-meta > :nth-child(3) > .btn-outline-danger').click();
  
  });
});
