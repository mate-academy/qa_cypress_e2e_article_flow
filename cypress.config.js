const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    testIsolation: false,
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomNumber = Math.floor(
            Math.random() * 1000000
          );
          const username = faker.person.firstName() +
            randomNumber;
          return {
            username,
            email: `${username.toLowerCase()}@mail.com`,
            password: '12345Qwert!'
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.words(),
            description: faker.lorem.words(),
            body: faker.lorem.paragraph()
          };
        }
      });
    }
  }
});
