/* eslint-disable */
/// <reference types='cypress' />
describe('check article flow', () => {
  beforeEach(() => {
    cy.task('generateUser').then((userDataString) => {
      const user = new Object(userDataString)
      cy.login(user.email, user.username, user.password)
    })
    cy.visit('/editor')
  })

  it.skip('article creation', () => {
    cy.task('generateArticleData').then((articleDataString) => {
      const article = new Object(articleDataString)
      cy.createArticle(article.title, article.description, article.body)
    })
  })

  it('article deletion', () => {
    cy.task('generateArticleData').then((articleDataString) => {
      const article = new Object(articleDataString)
      cy.createArticle(article.title, article.description, article.body)
    })
    cy.get('button.btn').should('contain.text', 'Delete Article').click()
  })
})
