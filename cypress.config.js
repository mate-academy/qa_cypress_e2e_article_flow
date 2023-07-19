const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        newArticle() {
          const newRandomNumber = Math.floor(Math.random(1000) * 1000);
          return {
            title: faker.lorem.word() + newRandomNumber,
            description: faker.lorem.word(),
            body: faker.lorem.word(),
            tag: faker.lorem.word()
          };
        }
      });
    }
  }
});
