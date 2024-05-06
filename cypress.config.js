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
            password: '12345Qwert!'
          };
        },
        generateArticle() {
          return{
            title: 'Commodo sunt voluptate nisi cupidatat cillum labore consectetur quis. ',
            description: 'Aliquip voluptate occaecat commodo labore ad veniam est. ',
            body: 'Dolore dolore tempor adipisicing consequat magna ullamco nostrud commodo reprehenderit laboris. '
          };
        }
      });
    }
  }
});
