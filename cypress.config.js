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
          return {
            username: faker.person.firstName() + randomNumber,
            email: email.toLowerCase(),
            password: '12345Qwert!'
          };
        },

        generateArticle() {
          const title = faker.lorem.sentence();
          const description = faker.lorem.lines(2);
          const body = faker.lorem.lines();
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
