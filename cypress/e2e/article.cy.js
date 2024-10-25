import { faker } from '@faker-js/faker';
/// <reference types='cypress' />

describe('Article page', () => {
  // Generate unique data for user and article
  const randomNumber = Math.floor(Math.random() * 1000);
  const user = {
    email: faker.internet.email(),
    username: `${faker.name.lastName()}${randomNumber}`,
    password: 'user1234'
  };

  const article = {
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
    tagList: ([faker.lorem.word()]).toString()
  };

  beforeEach(() => {
    cy.visit('/');
  });

  it('should register user and create an article', () => {
    // Register the user
    cy.login(user.email, user.username, user.password)
      .then(() => {
        // Verify the user is logged in
        cy.getCookie('auth')
          .should('exist');
        cy.reload();

        // Navigate to the new article page
        cy.contains('.nav-link', 'New Article')
          .click();

        // Fill in the article details
        cy.findByPlaceholder('Article Title').type(article.title);
        cy.findByPlaceholder('What\'s this article about?').type(article.description);
        cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
        cy.findByPlaceholder('Enter tags')
          .click()
          .type(`${article.tagList}{enter}`);

        // Publish the article
        cy.contains('.btn', 'Publish').click();

        // Verify the article is created
        cy.url().should('contain', 'article/');
      });
  });

  it('Should create and delete article with API', () => {
    // Create the article using the API
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const articleSlug = response.body.article.slug;

        // Visit the created article page
        cy.visit(`/article/${articleSlug}`);
        cy.url().should('contain', `article/${articleSlug}`);

        // Get the auth token from the cookie
        cy.getCookie('auth').then((token) => {
          const authToken = token.value;

          // Delete the article using the API
          cy.request({
            method: 'DELETE',
            url: `/api/articles/${articleSlug}`,
            headers: {
              Authorization: `Token ${authToken}`
            }
          }).then((response) => {
            // Verify the article is deleted
            expect(response.status).to.eq(204);
          });

          // Visit the article page again to verify it's deleted
          cy.visit(`/article/${articleSlug}`);
          cy.contains('Article not found');
        });
      });
  });
});
