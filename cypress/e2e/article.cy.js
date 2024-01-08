
let article
describe('Actions with articles', () => {
  beforeEach(() => {
    cy.login();
    cy.task('createArticle').then(createArticle => {
      article = createArticle;
   });
  });

  it('should provide an ability to create an article', () => {
    cy.visit('/');
    cy.get('[href="/editor"]').click();
    //cy.createArticle();
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('What\'s this article about?').type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)').type(article.articleBody);
    cy.findByPlaceholder('Enter tags').type(article.tag, {timeout: 1000});
    cy.contains('[type="button"]', 'Publish Articl').click({force: true});
    cy.get('.container').should('contain', article.title);


    

  });

  it.only('should provide an ability to delete an article', () => {
   

    cy.createArticle()
    .then((responce) => {
      const slug = responce.body.article.slug;
      cy.visit(`article/${slug}`);

    });


    //cy.get('[href="/editor"]').click();
    
      //cy.findByPlaceholder('Article Title').type(article.title);
      //cy.findByPlaceholder('What\'s this article about?').type(article.description);
      //cy.findByPlaceholder('Write your article (in markdown)').type(article.articleBody);
      //cy.findByPlaceholder('Enter tags').type(article.tag, {timeout: 1000});
      //cy.contains('[type="button"]', 'Publish Articl').click({force: true});
    
    cy.contains('[class="btn btn-outline-danger btn-sm"]', 'Delete Article').click();
    cy.on('window:confirm', (text) => {
      expect(text).to.contains('Do you really want to delete it?');
      return true;
    });

    cy.get('[class="hide-text user-pic"]').click({force: true});
    cy.get('[class="hide-text user-pic"]').click({force: true});
    cy.get('[class="preview-link"]').should('not.contain', article.title);



  });
});
