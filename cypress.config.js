const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const email = faker.internet.email();
          const randomNumber = Math.floor(Math.random(1000) * 1000);
          const username = faker.person.firstName() + randomNumber;
          return {
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: '12345Qwert!'
          };
        },

        createArticle() {
          const title = faker.lorem.sentence(3);
          const description = faker.lorem.paragraph(1);
          const body = faker.lorem.paragraphs(2, '\n\n');

          return {
            title,
            description,
            body
          };
        }
      });
    }
  }
});
