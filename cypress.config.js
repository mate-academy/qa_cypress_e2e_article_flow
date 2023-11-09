const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        generateArticle() {
          return {
            title: faker.lorem.words(),
            description: faker.lorem.sentence(),
            body: faker.lorem.paragraph()
          };
        },
        generateUser() {
          return {
            username: faker.random.word() + Math.round(Math.random(1000)),
            email: faker.internet.email(),
            password: 'Qaqaqa123!'
          };
        }
      });
    }
  }
});
