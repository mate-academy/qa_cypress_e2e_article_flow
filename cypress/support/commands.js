Cypress.Commands.add('login', (email, username, password) => {
  cy.request({
    method: 'POST',
    url: '/api/users',
    body: {
      user: { email, username, password }
    },
    failOnStatusCode: false, 
  }).then((response) => {
    const userData = response.body.user || { email, username, token: password }; 
    const user = {
      bio: userData.bio || '',
      effectiveImage: imgUrl,
      email: userData.email,
      image: userData.image || '',
      token: userData.token || password,
      username: userData.username || username,
    };
    window.localStorage.setItem('user', JSON.stringify(user));
    cy.setCookie('auth', user.token);
  });
});
