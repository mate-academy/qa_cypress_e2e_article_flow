describe('', () => {
  const user = {
    userName: 'tester',
    email: 'tester@tester.tester',
    password: 'Qwer123!'
  };
  const article = {
    title: 'Test Article',
    description: 'This is a test article description',
    body: 'This is the body of the test article'
  };

  beforeEach(() => {
    cy.visit('/');
  });

  it('successfully login', () => {
    cy.visit('user/login');
    cy.findByPlaceholder('Email').type(user.email);
    cy.findByPlaceholder('Password').type(`${user.password}{enter}`);
    cy.get(':nth-child(4) > .nav-link').should('contain', user.userName);
  });

  it('should be able to create an article', () => {
    cy.login(user.email, user.password);
    cy.reload().contains('.nav-link', 'New Article').click();
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    cy.contains('Publish Article').click();
    cy.url().should('include', '/article/');
  });

  it.only('should be able to delete an article', () => {
    cy.login(user.email, user.password);
    // Create the article and capture the response to get the article slug
    cy.createArticle('title', 'description', 'body').then((response) => {
      const slug = response.body.article.slug;
      cy.visit(`/article/${slug}`);
      cy.url().should('include', `/article/${slug}`);
      cy.get('.article-actions').contains('Delete Article').click();
      cy.on('window:confirm', (str) => {
        expect(str).to.equal('Do you really want to delete it?');
        return true;
      });
      cy.visit(`/article/${slug}`);
      cy.reload();// I trired to reload page but it doesn't work.
      cy.visit(`/article/${slug}`, { failOnStatusCode: false });
      // cy.get('h2').contains('This page could not be found.').should('exist'); // I tried also this but it doesn't work.
      cy.contains(`This page could not be found.`).should('exist');
    });
  });
});
