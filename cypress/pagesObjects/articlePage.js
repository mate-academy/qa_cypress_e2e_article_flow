/// <reference types ='cypress' />

export default class ArticlePage {
  visitArticlePage(slug, errorIgnore) {
    if (errorIgnore) {
      cy.visit(`${Cypress.config().baseUrl}article/${slug}`, { failOnStatusCode: false });
    } else {
      cy.visit(`${Cypress.config().baseUrl}article/${slug}`);
    }
  }

  get articleTitle() {
    return cy.get('h1');
  }

  assureArticleTitle(articleTitle) {
    this.articleTitle
      .should('have.text', articleTitle);
  }

  get articleContent() {
    return cy.get('.col-md-12 div p');
  }

  assureArticleContent(content) {
    this.articleContent
      .should('have.text', content);
  }

  get articleTag() {
    return cy.get('.tag-list li');
  }

  assurearticleTags(tags) {
    for (let i = 0; i < tags.length; i++) {
      this.articleTag.eq(i)
        .should('have.text', tags[i]);
    }
  }

  get articleAuthor() {
    return cy.get('.author').first();
  }

  assureArticleAuthor(username) {
    this.articleAuthor
      .should('have.text', username.toLowerCase());
  }

  get articleTitleDeleteBtn() {
    return cy.contains('button', 'Delete Article').first();
  }

  deleteArticleFromArticleTitle() {
    this.articleTitleDeleteBtn.click();
  }
}
