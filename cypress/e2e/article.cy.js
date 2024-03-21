describe('This article test', () => {
  let fakeuser;
  before(() => {
    cy.visit('https://conduit.mate.academy');
    cy.task('generateUser').then((generateUser) => {
      fakeuser = generateUser;
    });
  });

  const article = {
    title: 'SunnyDay' + Math.floor(Math.random() * 1000),
    description: 'Hitrii lis',
    body: 'Everybody',
  };

  it('should create a new article', () => {
    cy.login(fakeuser.email, fakeuser.username, fakeuser.password);
    cy.createArticle(article.title, article.description, article.body);
    cy.reload();
    cy.contains('a', 'Global Feed').click();
    cy.contains('h1', article.title).should('contain', article.title);
    cy.contains('p', article.description).should(
      'contain',
      article.description
    );
    cy.contains('.author', fakeuser.username.toLowerCase()).should(
      'contain',
      fakeuser.username.toLowerCase()
    );
  });

  it.only('should delete an article', () => {
    cy.login(fakeuser.email, fakeuser.username, fakeuser.password);
    cy.reload();
    cy.createArticle(article.title, article.description, article.body);
    cy.reload();
    cy.contains('a', 'Global Feed').click();
    cy.contains('h1', article.title).click();
    cy.contains('button', 'Delete Article').click();
    cy.contains('.article-preview', 'No articles are here... yet.').should(
      'be.visible'
    );
  });
});
