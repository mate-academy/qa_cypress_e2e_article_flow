/* eslint-disable max-len */
/// <reference types="cypress" />

describe('Conduit — поток статей', () => {
  // перед каждым тестом логинимся
  beforeEach(() => {
    cy.login(); // команда определена в cypress/support/commands.js
  });

  it('Создание новой статьи', () => {
    const randomId = Date.now();
    const article = {
      title: `Моя статья ${randomId}`,
      description: `Описание статьи ${randomId}`,
      body: `Это тело статьи, созданной автоматически в ${new Date().toLocaleString()}`,
      tags: 'test, cypress'
    };

    // Открываем форму создания статьи
    cy.contains('New Article').click();

    // Заполняем форму
    cy.get('input[placeholder="Article Title"]').type(article.title);
    cy.get('input[placeholder="What\'s this article about?"]').type(article.description);
    cy.get('textarea[placeholder="Write your article (in markdown)"]').type(article.body);
    cy.get('input[placeholder="Enter tags"]').type(article.tags);
    cy.contains('Publish Article').click();

    // Проверяем, что статья создалась и виден заголовок
    cy.contains(article.title).should('be.visible');
    cy.url().should('include', 'article');
  });

  it('Удаление статьи', () => {
    // Создаём статью заранее при помощи команды
    cy.createArticle().then((article) => {
      cy.visit(`/article/${article.slug}`);

      // Проверяем, что статья открылась
      cy.contains(article.title).should('be.visible');

      // Удаляем
      cy.contains('Delete Article').click();

      // Проверяем, что нас вернуло на главную
      cy.url().should('not.include', '/article/');
      cy.contains(article.title).should('not.exist');
    });
  });
});
