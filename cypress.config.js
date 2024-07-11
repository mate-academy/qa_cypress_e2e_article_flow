const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomNumber = Math.floor(Math.random(1000) * 1000);
          const email = `Artem.Zakharchuk${randomNumber}@ukr.net`;
          return {
            username: `Artem${randomNumber}`,
            email: email.toLowerCase(),
            password: '12345Qwert!'
          };
        },

        createArticle(userName) {
          return {
            title: 'Employment is close',
            description: 'Thrilling moment',
            body: `${userName} should finish all test tasks before the start.`
          };
        }
      });
    }
  }
});
