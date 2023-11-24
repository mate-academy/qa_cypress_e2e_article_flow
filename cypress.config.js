const { defineConfig } = require('cypress');
const faker = require('faker');
module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const email = faker.internet.email();
          return {
            username: faker.name.firstName(),
            email: email.toLowerCase(),
            password: '12345Qwert!'
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.word(),
            description: faker.lorem.word(),
            body: faker.lorem.word(),
            tag: faker.lorem.word()
          };
        }
      });
    }
  }
});
