const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const username = faker.person.firstName() + '-junior-';
          const email = faker.internet.email().toLowerCase();
          const password = 'Test-1234-aq';
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
