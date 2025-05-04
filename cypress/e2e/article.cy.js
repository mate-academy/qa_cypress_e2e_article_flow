describe('Article flow', () => {
  const email = faker.internet.email();
  const password = 'Test1234!';
  const username = faker.internet.userName();
  
  const article = {
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    body: faker.lorem.paragraph()
  };

  before(() => {
    cy.request('POST', '/api/users', {
      user: {
        username,
        email,
        password
      }
    });
  });

  it('should create an article', () => {
    cy.login(email, password);
    cy.visit('/');
    cy.contains('New Article').click();
    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get('[placeholder="What\'s this article about?"]').type(article.description);
    cy.get('[placeholder="Write your article (in markdown)"]').type(article.body);
    cy.contains('Publish Article').click();

    cy.url().should('include', '/article/');
    cy.contains(article.title).should('exist');
  });

  it('should delete an article', () => {
    cy.login(email, password);
    cy.createArticle(article);
 
    cy.visit('/');
    cy.contains('Global Feed').click();
    cy.contains(article.title).click();

    cy.contains('Delete Article').click();
  
    cy.contains('Global Feed').click();
    cy.contains(article.title).should('not.exist');
  });
});
