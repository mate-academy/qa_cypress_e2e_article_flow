describe('Article flow', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.visit('/');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.findByPlaceholder('Article Title')
      .type(article.title);
    cy.findByPlaceholder('What\'s this')
      .type(article.description);
    cy.findByPlaceholder('Write your')
      .type(article.body);
    cy.findByPlaceholder('Enter tags')
      .type(article.tag + '{enter}');
    cy.contains('.btn', 'Publish Article')
      .click();
    cy.get('.author')
      .should('contain', user.username);
    cy.get('h1')
      .should('contain', article.title);
    cy.get('.col-md-12')
      .should('contain', article.body);
    cy.get('.tag-list')
      .should('contain', article.tag);
  });

  it.only('should be deleted using Delete button', () => {
    cy.login(user.email, user.username, user.password);
      cy.visit('/editor');
    cy.createArticle(
      article.title, 
      article.description, 
      article.body).then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`article/${slug}`);
      })
    cy.contains('.btn', 'Delete Article')
      .eq(0)
      .click();
    cy.url()
      .should('eq', 'https://conduit.mate.academy/');
    cy.get('.nav-item')
      .should('contain', 'Global Feed');
    cy.get('.nav-item')
      .should('contain', 'Your Feed');
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  });
});
