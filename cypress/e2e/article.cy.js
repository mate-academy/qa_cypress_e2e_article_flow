describe('Conduit Article Flow', () => {
  const uniqueId = Date.now();
  const user = {
    email: `testuser_${uniqueId}@example.com`,
    username: `testuser_${uniqueId}`,
    password: 'TestPassword123!',
  };

  const article = {
    title: `Article Title ${uniqueId}`,
    description: 'Test article description',
    body: 'This is the article body for testing.',
    tag: 'cypress',
  };

  before(() => {
    // Create user
    cy.request('POST', 'https://conduit.mate.academy/api/users', {
      user,
    });

    // Login user and store token
    cy.request('POST', 'https://conduit.mate.academy/api/users/login', {
      user: {
        email: user.email,
        password: user.password,
      },
    }).then((resp) => {
      window.localStorage.setItem('jwt', resp.body.user.token);
    });
  });

  it('should create an article', () => {
    cy.request({
      method: 'POST',
      url: 'https://conduit.mate.academy/api/articles',
      headers: {
        Authorization: `Token ${window.localStorage.getItem('jwt')}`,
      },
      body: {
        article,
      },
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body.article.title).to.eq(article.title);
    });
  });

  it('should delete an article', () => {
    // First create article
    cy.request({
      method: 'POST',
      url: 'https://conduit.mate.academy/api/articles',
      headers: {
        Authorization: `Token ${window.localStorage.getItem('jwt')}`,
      },
      body: {
        article,
      },
    }).then((resp) => {
      const slug = resp.body.article.slug;

      // Then delete it
      cy.request({
        method: 'DELETE',
        url: `https://conduit.mate.academy/api/articles/${slug}`,
        headers: {
          Authorization: `Token ${window.localStorage.getItem('jwt')}`,
        },
      }).then((deleteResp) => {
        expect(deleteResp.status).to.eq(204);
      });
    });
  });
});
