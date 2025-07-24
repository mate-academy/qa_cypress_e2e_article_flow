/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Article Flow on Conduit App', () => {
  let userToken;
  let loggedInUser;
  let articleTitle;
  let articleDescription;
  let articleBody;
  let articleTags;
  let articleSlug;

  beforeEach(() => {
    cy.intercept('GET', '**/api/tags').as('getTags');
    cy.intercept('GET', '**/api/articles/feed?*').as('getArticlesFeed');
    cy.intercept('POST', '**/api/users').as('registerUserAPI');
    cy.intercept('POST', '**/api/users/login').as('loginUserAPI');
    cy.intercept('GET', '**/api/profiles/**').as('getUserProfile');

    cy.login().then((data) => { // Використовуємо кастомну команду login
      loggedInUser = data.user;
      userToken = data.token;

      cy.log(`API Logged in as: ${loggedInUser.username}`);
      cy.log(`User Token: ${userToken}`);

      cy.visit('/');

      // Логін через UI
      cy.get('.nav-link').contains('Sign in').click();
      cy.url().should('include', '/login');

      cy.get('[placeholder="Email"]').type(loggedInUser.email);
      cy.get('[placeholder="Password"]').type(loggedInUser.password);
      cy.get('button[type="submit"]').click();

      // Чекаємо завершення логіну
      cy.wait('@loginUserAPI', { timeout: 30000 })
        .its('response.statusCode')
        .should('eq', 200);

      // Чекаємо завантаження профілю користувача
      cy.wait(`@getUserProfile`, { timeout: 15000 })
        .its('request.url')
        .should('include', loggedInUser.username.toLowerCase());

      // Перевіряємо, що ім'я користувача відображається в навігації
      cy.get(`a.nav-link[href^="/profile/${loggedInUser.username.toLowerCase()}"]`,
        { timeout: 15000 })
        .should('be.visible')
        .invoke('text')
        .then((text) => {
          expect(text.trim().toLowerCase())
            .to.include(loggedInUser.username.toLowerCase());
        });

      // Перевіряємо наявність навігаційних посилань для залогіненого користувача
      cy.contains('.nav-link', 'New Article').should('be.visible');
      cy.contains('.nav-link', 'Settings').should('be.visible');
      cy.contains('.nav-link', 'Sign in').should('not.exist');
      cy.contains('.nav-link', 'Sign up').should('not.exist');

      // Переходимо на "Your Feed"
      cy.contains('.feed-toggle .nav-link', 'Your Feed')
        .should('be.visible')
        .click();
      cy.wait('@getArticlesFeed', { timeout: 15000 });
    });
  });

  it('should allow a logged-in user to create an article', () => {
    articleTitle = faker.lorem.sentence() + ' ' + Cypress._.random(0, 1e6);
    articleDescription = faker.lorem.paragraph();
    articleBody = faker.lorem.paragraphs(3);
    articleTags = [faker.lorem.word(), faker.lorem.word()];

    cy.contains('.nav-link', 'New Article').click();
    cy.url().should('include', '/editor');

    cy.contains('New Article', { timeout: 10000 }).should('be.visible');

    cy.get('[placeholder="Article Title"]').type(articleTitle);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(articleDescription);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(articleBody);
    cy.get('[placeholder="Enter tags"]').type(articleTags.join('{enter}') +
     '{enter}');

    cy.intercept('POST', '**/api/articles').as('createArticleAPI');

    cy.contains('button', 'Publish Article').click();

    cy.wait('@createArticleAPI').then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([200, 201]);
      articleSlug = interception.response.body.article.slug;
      cy.url().should('include', `/article/${articleSlug}`);
    });

    cy.contains('h1', articleTitle).should('be.visible');

    const paragraphs = articleBody.split('\n\n').filter((p) => p.trim() !== '');
    if (paragraphs.length > 0) {
      const firstSentence = paragraphs[0].split(/[.!?]/)[0].trim();
      const textToSearch = firstSentence.length > 10
        ? firstSentence
        : paragraphs[0].substring(0, Math.min(paragraphs[0].length, 50));
      cy.contains('p', textToSearch).should('be.visible');
    } else {
      cy.log('Article body is empty or' +
         'contains no valid paragraphs for assertion.');
    }

    articleTags.forEach((tag) => {
      cy.contains('.tag-list .tag-pill', tag).should('be.visible');
    });
  });

  it('should allow a logged-in user to delete an article', () => {
    const deleteArticleTitle = faker.lorem.sentence() + ' ' +
     Cypress._.random(0, 1e6);
    const deleteArticleDescription = faker.lorem.paragraph();
    const deleteArticleBody = faker.lorem.paragraphs(2);
    const deleteArticleTags = [faker.lorem.word()];

    cy.contains('.nav-link', 'New Article').click();
    cy.url().should('include', '/editor');
    cy.contains('New Article').should('be.visible');

    cy.get('[placeholder="Article Title"]').type(deleteArticleTitle);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(deleteArticleDescription);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(deleteArticleBody);
    cy.get('[placeholder="Enter tags"]').type(deleteArticleTags
      .join('{enter}') +
     '{enter}');

    cy.intercept('POST', '**/api/articles').as('createDeleteArticleAPI');
    cy.contains('button', 'Publish Article').click();

    cy.wait('@createDeleteArticleAPI').then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([200, 201]);
      const deleteArticleSlug = interception.response.body.article.slug;
      cy.url().should('include', `/article/${deleteArticleSlug}`);

      cy.contains('h1', deleteArticleTitle).should('be.visible'); // Перевіряємо, що стаття створена

      cy.intercept('DELETE', `**/api/articles/${deleteArticleSlug}`)
        .as('deleteArticleAPI');
      cy.intercept('GET', `**/api/articles/${deleteArticleSlug}`)
        .as('getDeletedArticleAPI');

      cy.contains('button', 'Delete Article').click();

      // Підтвердження діалогу видалення
      cy.on('window:confirm', (str) => {
        expect(str).to.eq('Do you really want to delete it?');
        return true; // Продовжити видалення
      });

      cy.wait('@deleteArticleAPI', { timeout: 10000 })
        .its('response.statusCode')
        .should('eq', 204);

      // Після видалення ми повертаємося на головну сторінку
      cy.url().should('not.include', `/article/${deleteArticleSlug}`);
      cy.url().should('eq', 'https://conduit.mate.academy/');
      cy.visit(`/article/${deleteArticleSlug}`, { failOnStatusCode: false });
      cy.wait('@getDeletedArticleAPI', { timeout: 10000 })
        .its('response.statusCode')
        .should('eq', 404);
      cy.log(`Article "${deleteArticleTitle}" with slug "${deleteArticleSlug}" was` +
        ` successfully deleted on the backend (API responded with 204 and` +
        ` subsequent GET with 404). UI bug observed where article content` +
        ` still displays.`);
    });
  });
});
