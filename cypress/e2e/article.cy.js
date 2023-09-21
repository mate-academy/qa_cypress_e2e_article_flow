describe('Create and delete the article', () => 
{
  const user = {
    email: 'vergie_cremin18@hotmail.com',
    password: 'MAma999',
    username: 'croatia111'
}

  const article = {
    title: 'Qwerty',
    description: 'Qwerty',
    body: 'Qwerty'
}

  beforeEach(() => {
    cy.visit('https://conduit.mate.academy/user/login');
  });

  it('Create the article', () => {
    cy.login(user.email, user.password);
    cy.visit('https://conduit.mate.academy/editor');
    cy.createArticle(article.title, article.description, article.body);
    
  });

  it('Delete the article', () => {
    cy.login(user.email, user.password);
    cy.visit('https://conduit.mate.academy/editor');
    cy.createArticle(article.title, article.description, article.body);
    cy.contains('Delete Article').click();
  })
});
