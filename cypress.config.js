const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        newArticle() {
          return {
            title: faker.random.words(2),
            description: faker.random.words(3),
            body: faker.random.words(8),
            tag: faker.random.word()
          };
        }
      });
    }
  }
});
