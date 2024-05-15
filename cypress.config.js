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
            username: faker.name.firstName() + randomNumber,
            email: email.toLowerCase(),
            password: '12345Qwert!'
          };
        },
        generateArticle() {
          const title = faker.lorem.word() + `${faker.number.int({ min: 500, max: 1000 })}`;
          const whatsArticle = faker.lorem.word();
          const writeArticle = faker.lorem.text();
          const tag = faker.lorem.word();
          return {
            title: title,
            description: whatsArticle,
            body: writeArticle,
            tagList: [tag]
          };
        }
      });
    }
  }
});
