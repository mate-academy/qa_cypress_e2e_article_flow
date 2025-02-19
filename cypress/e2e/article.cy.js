/// <reference types='cypress' />
import { faker } from '@faker-js/faker';

const { generateArticleData } = require('../support/generateArticleData');
function generateRandomUser() {
  return {
    username: faker.person.firstName() + faker.number.int(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };
}
describe('Article testing', () => {
  beforeEach(() => {
    const randomUser = generateRandomUser();
    cy.login(randomUser.email, randomUser.username, randomUser.password);
    cy.visit('/');
  });

  it('should create an article with valid data', () => {
    cy.visit('/editor');
    const articleData = generateArticleData();
    cy.createArticleUI(articleData);
    cy.verifyArticleData(articleData);
  });

  it('should delete an article from Global Feed', () => {
    const articleData = generateArticleData();
    cy.createArticleAPI(articleData);
    cy.reload();
    cy.goGlobalFeed();
    cy.contains(articleData.title).click();
    cy.contains('button', 'Delete Article').click();
    cy.goGlobalFeed();
    cy.reload();
    cy.contains(articleData.title).should('not.exist');
  });
});
