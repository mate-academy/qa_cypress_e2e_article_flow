const { defineConfig } = require('cypress');
const faker = require('@faker-js/faker').faker;

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const email = faker.internet.email();
          const randomNumber = Math.floor(Math.random(1000) * 1000);
          return {
            username: faker.person.firstName() + randomNumber,
            email: email.toLowerCase(),
            password: '12345Qwert!'
          };
        },
        generateArticle() {
          return {
            title: faker.word.verb(),
            desc: faker.word.words(5),
            body: faker.word.words(10)
          };
        }
      });
    }
  }
});
