const { defineConfig } = require("cypress");
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          return {
            username: faker.person.firstName() + faker.string.numeric(5),
            email: faker.internet.email().toLowerCase(),
            password: '12345Qwert!',
          };
        },
      });
    },
  },
});
