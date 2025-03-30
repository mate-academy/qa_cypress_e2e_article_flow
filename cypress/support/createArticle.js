const { faker } = require('@faker-js/faker');

const createArticle = () => {
const randomNumber = Math.floor(Math.random() * 1000);
  return { 
    title: faker.lorem.word() + randomNumber,
    description: faker.lorem.word(), 
    body: faker.lorem.word(), 
    tag: faker.lorem.word()
};
};
module.exports = { createArticle };
