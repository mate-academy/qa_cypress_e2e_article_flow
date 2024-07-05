const { defineConfig } = require(`cypress`);
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const email = faker.internet.email();
          const randomNumber = Math.floor(Math.random() * 1000);
          const username = faker.name.firstName().toLowerCase() +
            randomNumber.toString();

          return {
            username,
            email: email.toLowerCase(),
            password: '12345Qwert!'
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.words(3),
            description: faker.lorem.words(4),
            body: faker.lorem.words(8)
          };
        }
      });
    }
  }
});
