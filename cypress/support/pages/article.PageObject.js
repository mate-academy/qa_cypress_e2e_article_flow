import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  get deleteButton() {
    return cy.get(
      '.container > .article-meta > :nth-child(3) > .btn-outline-danger');
  }

  get articleTitle() {
    return cy.get('h1');
  }
}

export default ArticlePageObject;
