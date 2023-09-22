const faker = require('faker');
const homeUrl = 'https://conduit.mate.academy/';
const emptyFeedMessage = 'No articles are here... yet.';

export const article = {
    title: faker.lorem.word(),
    descr: faker.lorem.words(faker.random.number({ min: 2, max: 4 })),
    body: faker.lorem.words(faker.random.number({ min: 3, max: 10 })),
}

export function postArticle(title, description, body){
  cy.visit('editor');
  cy.getByPlaceholder('Article Title').type(title);
  cy.getByPlaceholder('What\'s this article about?').type(description);
  cy.getByPlaceholder('Write your article').type(body);
  cy.contains('button', 'Publish Article').click();
}

export function validateTitle(title){
  cy.get('h1').should('have.text', title);
  cy.url().should('include', title);
}
export function postApiArticle(){
  cy.createArticle(article.title, article.descr, article.body)
  .then(response => {
    const slug = response.body.article.slug;
    cy.visit(`article/${slug}`);
  });
}
export function deleteArticle(){
  cy.get(`.article-actions .btn:contains("Delete Article")`).click();
  cy.on('window:alert', (alert) => {
    expect(alert).to.equal('Do you really want to delete it?');
    return true;
  });
}

export function validateDeleteArticle(){
  cy.url().should('eq', homeUrl);
  cy.get('.article-preview').should('have.text', emptyFeedMessage);
}
