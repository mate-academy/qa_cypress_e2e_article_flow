describe('Article', () => {
  let user;
  let article;

  before(() => {
    cy.visit('/');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
  });
});
  it('Create the article', () => {
    cy.login(user.username, user.email,user.password);
    cy.visit('/editor');
    cy.get('[placeholder="Article Title"]')
      .type(article.title);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(article.description);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(article.body);
    cy.contains('.btn','Publish')
      .click();

    cy.get('.row article-content')
      .should('contain',article.title);

    cy.get('.btn-outline-danger')
      .should('exist');
  });

  it('Delete article ', () => {
    cy.createArticle(
      article.title, 
      article.description, 
      article.body, 
      article.tag
      ).then ((response) => {
    const slug = response.body.article.slug;
    cy.get('.btn-outline-danger')
      .eq(0)
      .click();

    cy.contains('.nav-link', 'Global Feed')
       .should('be.visible');
    });
  });
});

