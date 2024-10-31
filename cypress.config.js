const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const email = faker.internet.email();
          const randomNumber = Math.floor(Math.random(1000) * 1000);
          return {
            email: email.toLowerCase(),
            username: faker.name.firstName() + randomNumber,
            password: '12345Qwert!'
          };
        },
        generateArticle() {
          const title = faker.lorem.sentence(1);
          const description = faker.lorem.sentence({ min: 5, max: 7 });
          const body = faker.lorem.paragraph(2);
          const tagList = faker.helpers.arrayElements(
            ['tech', 'javascript', 'webdev', 'nodejs',
              'backend', 'frontend', 'html', 'css'],
            { min: 2, max: 4 }
          );
          return {
            title,
            description,
            body,
            tagList
          };
        }
      });
    }
  }
});
