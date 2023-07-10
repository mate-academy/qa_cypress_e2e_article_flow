import '../support/commands';
import faker from 'faker';

// in this test suite we check flows of article creating and article deleting
describe('', () => {
  let user;
   
  beforeEach(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.login(user.email, user.username, user.password);
      
    });
  });

  // this test is for flow of article creating
  it('should create the article', () => {
  
    const title = faker.lorem.sentence();
    const description = faker.lorem.paragraph();
    const body = faker.lorem.paragraphs();
  
    cy.createArticle(title, description, body);
    
    cy.request('/api/articles').then(response => {
      const articles = response.body.articles;
      const createdArticle = articles.find(article => article.title === title);
      
      expect(createdArticle).to.exist;
    });
  });

  //this test is for flow of article deleting
  it('should delete the article', () => {

    const title = faker.lorem.sentence();
    const description = faker.lorem.paragraph();
    const body = faker.lorem.paragraphs();
  
    cy.createArticle(title, description, body);
    
    cy.request('/api/articles').then(response => {
      const articles = response.body.articles;
      const createdArticle = articles.find(article => article.title === title);
      
      expect(createdArticle).to.exist;

      cy.visit('/');
      cy.wait(1000);
      cy.get('a.nav-link[href^="/profile/"]').click();
      cy.contains('h1', title).click();
      cy.get('button.btn.btn-outline-danger.btn-sm')
        .contains('Delete Article')
        .click();
      
      cy.get('a.nav-link[href^="/profile/"]').click();
      cy.reload();
      //cy.contains('a.nav-link.active', 'Your Feed').click();


      cy.contains(title).should('not.exist');
      cy.contains(description).should('not.exist');
      cy.contains(body).should('not.exist');
  });
});
});
