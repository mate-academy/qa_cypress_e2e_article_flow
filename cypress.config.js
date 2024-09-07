const { faker } = require('@faker-js/faker');
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const username =
            faker.person.firstName() + Math.round(Math.random * 10000);
          const email = faker.internet.email().toLowerCase();
          const password = 'Test1234';

          return {
            username,
            email,
            password
          };
        }
      });
    }
  }
});
