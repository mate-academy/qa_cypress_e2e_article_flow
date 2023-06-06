describe('New Article Page', () => {

  let user;
  let article;

  beforeEach(() => {

    cy.visit('')

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });

  });

  it('Create the article', () => {

    cy.login(user.email, user.username, user.password);

    cy.visit('/editor');

    cy.findByPlaceholder('Article Title')
      .type(article.title);

    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);

    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);

    cy.findByPlaceholder('Enter tags')
      .type(`${article.tag}{enter}`);

    cy.contains('.btn', 'Publish Article')
      .click();

    cy.get('h1')
      .should('contain', article.title);

    cy.get('.col-md-12')
      .should('contain', article.body);

    cy.get('.tag-list')
      .should('contain', article.tag);

  });

  it('Delete the created article', () => {

    cy.login(user.email, user.username, user.password);

    cy.visit('/editor');

    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;

        cy.visit(`article/${slug}`);

      });

    cy.get('.btn.btn-outline-danger')
      .eq(1)
      .click();
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  });
});
