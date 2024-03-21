const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          return {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            article: {
              title: faker.lorem.word(),
              about: faker.lorem.words(2),
              conten: faker.lorem.words(10),
              tag: faker.lorem.word()
            }
          };
        }
      });
    }
  }
});
