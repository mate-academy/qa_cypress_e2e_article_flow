// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const { faker } = require("@faker-js/faker");

const imgUrl = "https://static.productionready.io/images/smiley-cyrus.jpg";

Cypress.Commands.add("login", (email, password) => {
  cy.request("POST", "api/users/login", {
    user: {
      email: email,
      password: password,
    },
  }).then((response) => {
    const user = {
      username: response.body.user.username,
      email: response.body.user.email,
      token: response.body.user.token,
      bio: response.body.user.bio,
      image: response.body.user.effectiveImage,
      effectiveImage:
        "https://static.productionready.io/images/smiley-cyrus.jpg",
    };
    window.localStorage.setItem("user", JSON.stringify(user));
    cy.setCookie("auth", response.body.user.token);
  });
});

Cypress.Commands.add("createArticle", (title, description, body) => {
  cy.getCookie("auth").then((token) => {
    const authToken = token.value;

    cy.request({
      method: "POST",
      url: "/api/articles",
      body: {
        article: {
          title,
          description,
          body,
          tagList: [],
        },
      },
      headers: {
        Authorization: `Token ${authToken}`,
      },
    }).then((response) => {
      Cypress.env("articleUrl", `/article/${response.body.article.slug}`);
    });
  });
});

const generateArticle = () => {
  const randomNumber = Math.floor(Math.random() * 1000);
  return {
    title: faker.lorem.word() + randomNumber,
    description: faker.lorem.word(),
    body: faker.lorem.word(),
    tag: faker.lorem.word(),
  };
};

module.exports = { generateArticle };