/// <reference types = 'cypress'/>

let user;
let newArticle;

describe('Conduit "New article" page', () => {
  beforeEach(() => {
    cy.visit('');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      newArticle = generateArticle;
    });
  });

  it('should create new article', () => {
    cy.visit('/user/register/');
    cy.findByPlaceholder('Username').type(user.username);
    cy.findByPlaceholder('Email').type(user.email);
    cy.findByPlaceholder('Password').type(user.password);

    cy.get('[type="submit"]').click();

    cy.get('.pull-xs-right').should('contain', user.username.toLowerCase());
    cy.get('.pull-xs-right').should('contain', 'Settings');
    // eslint-disable-next-line max-len
    cy.get('.pull-xs-right').should('contain', 'New Article');
    cy.get('.ion-compose').click();

    cy.findByPlaceholder('Article Title').type(newArticle.title);
    cy.findByPlaceholder('What\'s this article about?')
      .type(newArticle.description);
    // eslint-disable-next-line max-len
    cy.findByPlaceholder('Write your article (in markdown)').type(newArticle.body);
    cy.findByPlaceholder('Enter tags').type(newArticle.tag);

    cy.get('[type="button"]').click();
    cy.get('[type="button"]').click();

    cy.get('.banner').should('contain', newArticle.title);
    cy.get('.article-page').should('contain', newArticle.body);
    cy.get('.article-page').should('contain', newArticle.tag);

    cy.get('.article-page').should('contain', 'Edit Article');
    cy.get('.article-page').should('contain', 'Delete Article');
    cy.url().should('include', newArticle.title.toLowerCase());
  });

  it.only('should delete the existing article', () => {
    cy.login(user.email, user.username, user.password);
    // eslint-disable-next-line max-len
    cy.createArticle(newArticle.title, newArticle.description, newArticle.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`/article/${slug}`);
      });
    cy.get('.container > .article-meta > :nth-child(3) > .btn-outline-danger')
      .should('contain', 'Delete Article').click();
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Do you really want to delete it?');
    });
    cy.on('window:confirm', () => true);
    cy.get('.user-pic').click();
    cy.get('.article-preview').should('not.contain', newArticle.title);
  });
});
