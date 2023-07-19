const { defineConfig } = require("cypress");
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        newArticle() {
          return {
            title: faker.random.words(),
            description: faker.random.words(),
            body: faker.random.words(),
            tag: faker.random.word(),
          };
        }
      });
    }
  }
});
