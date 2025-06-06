describe('Article Flow via API', () => {
  const email = `user${Date.now()}@test.com`;
  const username = `user${Date.now()}`;
  const password = 'TestPassword123!';

  const title = `Test Article ${Date.now()}`;
  const description = 'About testing';
  const body = 'This is a test article created by Cypress';

  it('should create a new article', () => {
    cy.request('POST', 'https://conduit.mate.academy/api/users', {
      user: { email, username, password }
    });

    cy.request('POST', 'https://conduit.mate.academy/api/users/login', {
      user: { email, password }
    }).then((response) => {
      const user = response.body.user;
      cy.setCookie('auth', user.token);

      cy.window().then((win) => {
        win.localStorage.setItem('user', JSON.stringify(user));
      });
    });

    cy.createArticle(title, description, body);
  });

  it('should delete the article', () => {
    cy.request('POST', 'https://conduit.mate.academy/api/users/login', {
      user: { email, password }
    }).then((response) => {
      const user = response.body.user;
      cy.setCookie('auth', user.token);

      cy.window().then((win) => {
        win.localStorage.setItem('user', JSON.stringify(user));
      });
    });

    cy.createArticle(title, description, body);

    cy.request('GET', 'https://conduit.mate.academy/api/articles?limit=10')
      .then((res) => {
        cy.window().then((win) => {
          const user = JSON.parse(win.localStorage.getItem('user'));

          const article = res.body.articles.find((a) => a.title === title);
          // eslint-disable-next-line no-unused-expressions
          expect(article, 'Article must be found').to.exist;

          const slug = article.slug;

          cy.request({
            method: 'DELETE',
            url: `https://conduit.mate.academy/api/articles/${slug}`,
            headers: {
              Authorization: `Token ${user.token}`
            }
          }).then((deleteResponse) => {
            expect(deleteResponse.status).to.eq(204);
          });
        });
      });
  });
});
