/// <reference types='cypress' />

describe('', () => {
  let user;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
      cy.visit('/');
    });
  });

  it('should have the ability to create an article', () => {
    let article;
    let usernameToLowerCase = user.username.toLowerCase();
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
      cy.createArticle(article.title, article.about, article.body);
      cy.get('.link.nav-link').eq(1).click();
      cy.contains('.article-preview', article.title).should('exist');
      cy.contains('.article-preview', article.title)
        .find('.author')
        .should('have.text', usernameToLowerCase);
    });
  });

  it('should have the ability to delete an article', () => {
    const textConfirmAlert = 'Do you really want to delete it?';
    const messageForNoPosts = 'No articles are here... yet.';
    let article;

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
      cy.createArticle(article.title, article.about, article.body);
      cy.get('.nav-item').eq(3).click();
      cy.get('.preview-link').eq(0).click();
      cy.get('.ion-trash-a').eq(0).click();
      cy.on('window:confirm', (textOfConfirm) => {
        expect(textOfConfirm).to.equal(textConfirmAlert);
        return true;
      });

      cy.get('.nav-item').eq(3).click();
      cy.get('.article-preview').should('have.text', messageForNoPosts);
    });
  });
});
