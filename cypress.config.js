const { faker } = require('@faker-js/faker');

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomSuffix = Math.floor(Math.random() * 10000);
          const user = {
            email: faker.internet.email().toLowerCase(),
            username: `${faker.person.firstName()}${randomSuffix}`.replace(/[^a-zA-Z0-9]/g, '').slice(0, 30),
            password: '12345Qwert!'
          };
          return user;
        }
      });
    }
  }
});
