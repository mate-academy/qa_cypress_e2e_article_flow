describe('', () => {
  before(() => {
    cy.visit('/');
  });

  it('should create article', () => {
    const numberOfArticles = Math.floor(Math.random() * 1000);
    cy.task('generateUser').then((user) => {
      cy.login(user.email, user.username, user.password);

      cy.visit('/');

      // Перевірка: користувач залогінений
      cy.contains(user.username.toLowerCase()).should('be.visible');

      // Створення статті
      cy.createArticle(`Cypress Test ${numberOfArticles}`, 'Test description', 'Test body');

      // Перевірка: стаття існує
      cy.visit('/');
      cy.reload();
      cy.get('.nav > :nth-child(2) > .link').click();

      cy.contains('Cypress Test ' + numberOfArticles).should('be.visible');
    });
  });

  it('should delete article', () => {
    const numberOfArticles = Math.floor(Math.random() * 1000);
    cy.task('generateUser').then((user) => {
      cy.login(user.email, user.username, user.password);

      cy.visit('/');

      // Перевірка: користувач залогінений
      cy.contains(user.username.toLowerCase()).should('be.visible');

      // Створення статті
      cy.createArticle(`Cypress Test ${numberOfArticles}`, 'Test description', 'Test body');

      // Перевірка: стаття існує
      cy.visit('/');
      cy.reload();
      cy.get('.nav > :nth-child(2) > .link').click();

      cy.contains('Cypress Test ' + numberOfArticles).should('be.visible');

      // Видалення статті
      cy.get('.col-md-9 > :nth-child(2)').click();
      // eslint-disable-next-line max-len
      cy.get('.container > .article-meta > :nth-child(3) > .btn-outline-danger')
        .click();

      // Перевірка: стаття видалена
      cy.visit('/');
      cy.get('.nav > :nth-child(2) > .link').click();
      cy.contains('Cypress Test ' + numberOfArticles).should('not.exist');
    });
  });
});
