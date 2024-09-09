const { defineConfig } = require('cypress');
// const faker = require('faker');
const user = {
  username: '',
  email: '',
  password: ''
};

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser: () => {
          const randomNumber = Math.floor(Math.random(1000) * 1000);
          const email = `test${randomNumber}@domain.com`;// faker.internet.email();
          user.username = 'TestUsername' + randomNumber;
          user.email = email.toLowerCase();
          user.password = '12345Qwert!';
          return user;
        }
      });
    }
  }
});
