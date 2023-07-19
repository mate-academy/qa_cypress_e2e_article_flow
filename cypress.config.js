const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        newArticle() {
          const randomNumber = Math.floor(Math.random(1000) * 1000);
          return {
            title: faker.lorem.word() + randomNumber,
            description: faker.lorem.words(),
            body: faker.lorem.sentences(),
            tag: '#' + faker.lorem.word()
          };
        }
      });
    }
  }
});
