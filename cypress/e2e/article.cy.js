describe('Conduit user can', () => {
  let user;

  beforeEach(() => {
    cy.visit('');
    cy.task('generateUser').then((generateUser) => {
      cy.log(generateUser);
      user = generateUser;
    });
    cy.log(user);
  });

  const texts = {
    phArtTitle: 'Article Title',
    phArtDescribe: 'What\'s this article about?',
    phArtBody: 'Write your article',
    phArtTags: 'Enter tags',
    btnDelete: 'Delete Article',
    noArtMessage: 'No articles are here... yet.'
  };

  it('create new artile', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('');
    cy.get('.ion-compose').click();
    cy.getPlaceholder(texts.phArtTitle).type(user.artTitle);
    cy.getPlaceholder(texts.phArtDescribe).type(user.artDescribe);
    cy.getPlaceholder(texts.phArtBody).type(user.artBody);
    cy.getPlaceholder(texts.phArtTags).type(`${user.artTitle}{enter}`);
    cy.get('[type="button"]').click();
    cy.get('.col-md-12').should('contain', user.artBody);
  });

  it('delete article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('');
    cy.createArticle(user.artTitle, user.artDescribe, user.artBody);
    cy.contains('.nav-link', user.username.toLowerCase()).click();
    cy.contains('h1', user.artTitle).click();
    cy.contains('.btn', texts.btnDelete).click();
    cy.contains('.nav-link', user.username.toLowerCase()).click();
    cy.reload();
    cy.get('.article-preview').should('contain', texts.noArtMessage);
  });
});
