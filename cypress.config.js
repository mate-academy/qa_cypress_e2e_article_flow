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
            username: faker.name.firstName().toLowerCase() + randomNumber,
            email: email.toLowerCase(),
            password: '12345Qwert!'
          };
        },
        generateArticl() {
          return {
            title: faker.lorem.word(10),
            description: faker.lorem.words({ min: 5, max: 15 }),
            body: faker.lorem.words(10),
            tagList: faker.lorem.word()
          };
        }
      });
    }
  }
});
