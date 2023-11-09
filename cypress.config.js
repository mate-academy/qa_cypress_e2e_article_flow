const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          return {
            email: faker.internet.email(),
            userName: faker.internet.userName(),
            password: faker.internet.password()
          };
        }
      });
      on('task', {
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
