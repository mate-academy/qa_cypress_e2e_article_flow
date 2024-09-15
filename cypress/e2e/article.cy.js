/// <reference types='cypress' />
import * as data from './articleUtils';


describe('Article flow', () => {

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      cy.login(generateUser.email, generateUser.username, generateUser.password);
    });
    cy.visit('');
  });

  it('should be able to create the article', () => {
    data.postArticle(data.article.title, data.article.descr, data.article.body);
    data.validateTitle(data.article.title);
  });

  it('should be able to delete the article', () => {
    data.postApiArticle();
    data.deleteArticle();
    data.validateDeleteArticle();
  });

})
