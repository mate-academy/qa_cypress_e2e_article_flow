const { defineConfig } = require('cypress');
// const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomNumber = Math.floor(Math.random(1000) * 1000);
          const email = `test${randomNumber}@domain.com`;// faker.internet.email();
          return {
            username: 'TestUsername' + randomNumber, // faker.name.firstName() + randomNumber,
            email: email.toLowerCase(),
            password: '12345Qwert!'
          };
        }
      });
    }
  }
});
