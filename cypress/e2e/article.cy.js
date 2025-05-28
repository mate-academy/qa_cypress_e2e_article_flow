import './../support/commands'
describe('Create and delete article', () => {
  let token;
  let slug;

  const random = Math.random().toString().slice(2);
  const email = `test${random}@test.com`;
  const username = `user${random}`;
  const password = `pass${random}`;
  const title = `title-${random}`;
  const description = `desc-${random}`;
  const body = `body-${random}`;

  before(() => {
    cy.login(email, username, password).then((receivedToken) => {
      token = receivedToken;  // tu jest już string tokena
    });
  });

  it('should create article', () => {
    cy.createArticle(title, description, body).then((response) => {
      expect(response.status).to.eq(200);
      slug = response.body.article.slug;
      expect(slug).to.exist;
    });
  });

  it('should delete article', () => {
    expect(token).to.exist;
    expect(slug).to.exist;

    cy.request({
      method: 'DELETE',
      url: `https://conduit.mate.academy/api/articles/${slug}`,
      headers: {
        Authorization: `Token ${token}`
      }
    }).then((res) => {
      expect(res.status).to.eq(204);
    });
  });
});