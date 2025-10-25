const { faker } = require('@faker-js/faker');

const generateArticle = () => {
  const title = faker.company.buzzNoun();
  const description = faker.lorem.sentence();
  const body = faker.lorem.paragraphs({ min: 2, max: 5, separator: '\n\n' });
  const tags = faker.word.adjective();

  return {
    title,
    description,
    body,
    tags
  };
};

module.exports = {
  generateArticle
};
