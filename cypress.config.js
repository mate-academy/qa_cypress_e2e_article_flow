const { defineConfig } = require("cypress");
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const email = faker.internet.email();
          const randomNumber = Math.floor(Math.random(1000) * 1000);
          const username = faker.name.firstName() + randomNumber;
          return {
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: '12345Qwert!'
          };}, 
        generateArticle() {
            const title = faker.name.firstName();
            const randomNumber = Math.floor(Math.random(1000) * 1000);
            return {
              title: faker.name.firstName() + randomNumber,
              desc: faker.name.firstName(),
              body: faker.name.firstName(),
            };            
          }   
          
      });
      // on('task', {
      //   generateArticle() {
      //     const title = faker.name.fullName();
      //     const randomNumber = Math.floor(Math.random(1000) * 1000);
      //     return {
      //       title: faker.name.fullName() + randomNumber,
      //       desc: faker.name.Name(),
      //       body: faker.name.Name(),
      //     };
          
      //   }

        
      // });
    }
  }
});
