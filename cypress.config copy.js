const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    //baseUrl: 'https://conduit.mate.academy',

    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          randomIndex = Math.floor(Math.random() * 100);
          return {
            email: randomIndex + faker.internet.email(),
            username: faker.person.username() + randomIndex,
            password: faker.internet.password(),
          };
        },
      });
    },
  },
});
