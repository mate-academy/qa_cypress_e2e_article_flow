import PageObject from '../PageObject';

class EditArticlePageObject extends PageObject {
  url = '/editor';

  get titleField() {
    return cy.findByPlaceholder('Article Title');
  }

  get descriptionField() {
    return cy.findByPlaceholder('What\'s this article about?');
  }

  get bodyField() {
    return cy.findByPlaceholder('Write your article (in markdown)');
  }

  get publishButton() {
    return cy.contains('[class="btn btn-lg pull-xs-right btn-primary"]'
      , 'Publish');
  }
}

export default EditArticlePageObject;
