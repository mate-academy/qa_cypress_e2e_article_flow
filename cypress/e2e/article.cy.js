import { faker } from '@faker-js/faker';

let userData;
let articleTitle;
let articleDescription;
let articleBody;

describe('Conduit Article Flow', () => {
  before(() => {
    cy.task('generateUser').then((user) => {
      userData = user;
      cy.login(userData.email, userData.username, userData.password);
    });
  });

  beforeEach(() => {
    articleTitle = `Test Article Title ${faker.number.int({ min: 1000, max: 9999 })}`; 
    articleDescription = faker.lorem.sentence(); 
    articleBody = faker.lorem.paragraph(); 
  });

  it('should create an article successfully', () => {
    cy.createArticle(articleTitle, articleDescription, articleBody).then((response) => {
      expect(response.status).to.eq(200); 
  
      
      cy.intercept('GET', '/api/articles**').as('getArticles');
      cy.visit('/'); 
  
      cy.wait('@getArticles'); 
      cy.contains(articleTitle).should('be.visible'); 
    });
  });

  it('should delete an article successfully', () => {
    cy.createArticle(articleTitle, articleDescription, articleBody).then((response) => {
      const slug = response.body.article.slug; 
      
      
      cy.contains(articleTitle).should('be.visible'); 
      
      
      cy.deleteArticle(slug).then((delResponse) => {
        expect(delResponse.status).to.eq(204); 
      });
      
      cy.visit('/');
      
      
      cy.intercept('GET', '/api/articles').as('getArticlesAfterDeletion');
      cy.wait('@getArticlesAfterDeletion'); 
      
      cy.contains(articleTitle).should('not.exist');
    });
  });
});