import { faker } from '@faker-js/faker';

export function generateArticle() {
  return {
    title: faker.lorem.words(3).replace(/^./, (c) => c.toUpperCase()),
    description: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(1),
    tags: faker.lorem.words(3).split(' ')
  };
}
