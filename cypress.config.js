const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const email = faker.internet.email();
          const randomNumber = Math.floor(Math.random() * 100);
          return {
            username: faker.person.firstName() + randomNumber,
            email: faker.internet.email().toLowerCase(),
            password: '12345Qwert!',
          };
        },
      });
    },
  },
});
