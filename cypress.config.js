const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const email = faker.internet.email();
          const randomNumber = Math.floor(Math.random(1000) * 1000);
          return {
            username: faker.name.firstName() + randomNumber,
            email: email.toLowerCase(),
            password: '12345Qwert!'
          };
        }
      });

      on('task', {
        generateArticle() {
          return {
            title: faker.lorem.paragraph(1),
            description: faker.lorem.paragraph(1),
            body: faker.lorem.paragraph(2),
            tag: faker.random.words(1)
          };
        }
      });
    }
  }
});
