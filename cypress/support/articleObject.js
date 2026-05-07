import { returnRandom, cutText }
  from './customComands.js';
import { faker } from '@faker-js/faker/locale/af_ZA';

const randomDataObj = {
  randomTitle() {
    const title = returnRandom([
      faker.animal.type(),
      faker.color.human(),
      faker.airline.aircraftType(),
      faker.finance.transactionType(),
      faker.commerce.product()
    ]);

    const result = cutText(title, 5);

    return result;
  },
  randomAbout() {
    const about = returnRandom([
      faker.company.catchPhrase(),
      faker.word.sample(),
      faker.hacker.phrase(),
      faker.hacker.ingverb(),
      faker.person.middleName()
    ]);

    const result = cutText(about, 6);

    return result;
  },
  randomBody() {
    const body = returnRandom([
      faker.lorem.sentences(),
      faker.word.words({
        count: {
          min: 3,
          max: 30
        }
      }),
      faker.commerce.productDescription(),
      faker.company.buzzPhrase()
    ]);

    const result = cutText(body, 30);

    return result;
  },
  randomTags() {
    const result = [];
    const howManyTags = returnRandom([1, 2, 3, 4, 5]);

    for (let i = 0; i < howManyTags; i++) {
      const tag = returnRandom([
        faker.location.city(),
        faker.location.country(),
        faker.color.human(),
        faker.animal.type(),
        faker.commerce.product(),
        faker.hacker.verb()
      ]);

      result.push(cutText(tag, 3));
    }

    return result;
  }
};

class Article {
  version1 = {
    title: randomDataObj.randomTitle(),
    about: randomDataObj.randomAbout(),
    body: randomDataObj.randomBody(),
    tags: randomDataObj.randomTags()
  };

  version2 = {
    title: randomDataObj.randomTitle(),
    about: randomDataObj.randomAbout(),
    body: randomDataObj.randomBody(),
    tags: randomDataObj.randomTags()
  };
};

export default Article;
