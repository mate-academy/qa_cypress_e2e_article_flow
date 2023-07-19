const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        newArticle() {
          return {
            title: faker.lorem.word(),

            description: faker.lorem.words(),

            body: faker.lorem.words(),

            tags: faker.lorem.word()
          };
        }
      });
    }
  }
});
