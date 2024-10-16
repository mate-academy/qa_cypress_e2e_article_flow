const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          return {
            email: faker.internet.email(),
            username: faker.internet.userName(),
            password: faker.internet.password()
          };
        },

        generateArticle() {
          return {
            title: `Article Title ${Date.now()}`,
            description: faker.lorem.sentence(),
            body: faker.lorem.paragraphs(3)
          };
        }
      });
    }
  }
});
