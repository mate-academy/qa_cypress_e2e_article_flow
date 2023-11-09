describe('Article flow', () => {

   let user;
   let article;

beforeEach(() => {
   cy.task('generateUser').then((generateUser) => {
   user = generateUser;
   });
   cy.task('generateArticle').then((generateArticle) => {
   article = generateArticle;
   });
  });

it('should create an article', () => {
   cy.login(user.email, user.username, user.password);
   cy.visit('/editor');
   cy.get('[placeholder="Article Title"]')
    .type(article.title);
   cy.get('[placeholder="What\'s this article about?"]')
    .type(article.description);
   cy.get('[placeholder="Write your article (in markdown)"]')
    .type(article.body);
   cy.contains('button', 'Publish Article')
    .click();
   cy.get('.article-page')
    .should('contain', article.title);
   cy.get('.article-content')
    .should('contain', article.body);
  });

it('should delete an article', () => {
   cy.login(user.email, user.username, user.password);
   cy.visit('/editor');
   cy.createArticle(article.title, article.description, article.body).then((response) => {
    cy.visit(`article/${response.body.article.slug}`);
   });
   cy.contains('Delete Article')
    .click();
   cy.get('.col-md-9')
    .should('not.contain', article.title);
   cy.get('.col-md-9')
    .should('not.contain', article.description);
  });
});
