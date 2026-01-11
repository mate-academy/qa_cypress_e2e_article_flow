describe('Article Management', () => {
  before(() => {
    cy.visit('/');
  });

  beforeEach(() => {
    cy.task('generateUser').then((user) => {
      cy.login(user.email, user.username, user.password);
      cy.wrap(user).as('user');
      cy.visit('/');
      // Перевірка: користувач залогінений
      cy.contains(user.username.toLowerCase()).should('be.visible');
    });
  });

  it('should create article', () => {
    const numberOfArticles = Math.floor(Math.random() * 1000);
    cy.createArticle(`Cypress Test ${numberOfArticles}`, 'Test description', 'Test body');

    // Перевірка: стаття існує
    cy.visit('/');
    cy.reload();
    cy.get('@user').then((user) => {
      cy.contains('a.nav-link', user.username.toLowerCase()).click();
    });
    cy.contains('Cypress Test ' + numberOfArticles).should('be.visible');
  });

  describe('Delete Article', () => {
    beforeEach(() => {
      const numberOfArticles = Math.floor(Math.random() * 1000);
      const title = `Cypress Test ${numberOfArticles}`;
      cy.createArticle(title, 'Test description',
        'Test body').then((article) => {
        cy.wrap(article).as('article');
        cy.wrap(title).as('articleTitle');
      });
    });

    it('should delete article', () => {
      cy.get('@user').then((user) => {
        cy.get('@articleTitle').then((title) => {
          // Перевірка: стаття існує в профілі користувача
          cy.visit('/');
          cy.contains('a.nav-link', user.username.toLowerCase()).click();
          cy.contains('a.preview-link', title).should('be.visible');

          // Видалення статті — шукаємо кнопку по тексту
          cy.contains('a.preview-link', title).click();
          cy.contains('button', 'Delete Article').click();

          // Перевірка: стаття видалена
          cy.visit('/');
          cy.contains('a.nav-link', user.username.toLowerCase()).click();
          cy.contains(title).should('not.exist');
        });
      });
    });
  });
});
