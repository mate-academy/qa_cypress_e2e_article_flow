const { defineConfig } = require('cypress');
//const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          function generateRandomEnglishString(length) {
            const characters =
              'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

            let randomString = '';

            for (let i = 0; i < length; i++) {
              const randomIndex = Math.floor(Math.random() * characters.length);
              randomString += characters[randomIndex];
            }

            return randomString;
          }

          function generateRandomEmail() {
            const firstName = generateRandomEnglishString(5);
            const lastName = generateRandomEnglishString(10);
            const domain1 = generateRandomEnglishString(7);
            const domain2 = generateRandomEnglishString(4);
            return `${firstName}.${lastName}@${domain1}.${domain2}`;
          }
          const email = generateRandomEmail();
          const randomNumber = Math.floor(Math.random(1000) * 1000);
          return {
            username: generateRandomEnglishString(7) + randomNumber,
            email: email.toLowerCase(),
            password: '12345Qwert!',
            articleTitle: generateRandomEnglishString(10) + randomNumber,
            articleDescription: generateRandomEnglishString(20) + randomNumber,
            articleBody: generateRandomEnglishString(40) + randomNumber
          };
        },
      });
    },
  },
});
