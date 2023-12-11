const { defineConfig } = require("cypress");
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
            password: '12345Qwert!',
            articleTitle: faker.lorem.words(2),
            articleBio: faker.lorem.word(5),
            articleContent: faker.lorem.words(15),
            articleTags: `#${faker.lorem.words(1)} #${faker.lorem.words(1)} {enter}`,
          };
        }
      });
    }
  }
});
