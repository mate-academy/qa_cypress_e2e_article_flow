const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        generateArticle() {
          return {
            title: faker.random.word(),
            description: faker.random.word(),
            body: faker.random.word(),
            tag: faker.random.word()
          };
        }
      });
    }
  }
});
