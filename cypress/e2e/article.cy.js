describe('Article', () => {
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

  it('should provide an ability to create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');

    cy.get('[placeholder="Article Title"]')
      .type(article.title);
    cy.get('[placeholder^="What\'s this article about?"]')
      .type(article.description);
    cy.get('[placeholder^="Write your article (in markdown)"]')
      .type(article.body);
    cy.get('.btn')
      .should('contain', 'Publish Article')
      .click();
    cy.get('.article-page')
      .should('contain', article.title);
    cy.get('.article-content')
      .should('contain', article.body);
      cy.get('.btn')
      .should('contain', 'Edit Article')
      cy.get('.btn')
      .should('contain', 'Delete Article')
  });

  it('should be deleted by clicking delete button', () => {
    cy.login(user.email, user.username, user.password);

    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`article/${slug}`);
        cy.get('.banner')
          .should('contain', article.title);
        cy.contains('.btn', 'Delete Article')
          .eq(0)
          .click();
        cy.on('window:confirm', (str) => {
          expect(str).to.equal('Do you really want to delete it?');
        });
        cy.url().should('equal', 'https://conduit.mate.academy/');
      });
  });
});
