const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const username = faker.name.firstName();
          const email = faker.internet.email();
          const randomNumber = Math.floor(Math.random(1000) * 1000);
          return {
            username: username.toLowerCase() + randomNumber,
            email: email.toLowerCase(),
            password: '12345Qwert!'
          };
        },
        generateArticle() {
          return{
            title: faker.random.word(),
            description: faker.random.words(),
            body: faker.random.words(),
            tag: faker.random.word()
          };
        }
      });
    }
  }
});
