const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy',

    setupNodeEvents(on, config) {
      on('task', {
        newUser() {
          const email = faker.internet.email();
          const randomNumber = Math.floor(Math.random(1000) * 1000);

          return {
            username: faker.person.firstName() + randomNumber,
            email: email.toLowerCase(),
            password: '12345Qwert!'
          };
        },

        newArticle() {
          return {
            title: faker.lorem.words(),
            description: faker.lorem.words(),
            body: faker.lorem.words(),
            tags: faker.lorem.words()
          };
        }
      });
    }
  }
});
