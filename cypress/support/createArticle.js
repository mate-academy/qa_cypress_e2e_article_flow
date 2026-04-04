function createArticle() {
  const id = new Date().getMilliseconds();
  const title = `Test Article Title ${id}`;
  const description = `This is a short description for testing purposes ${id}`;
  const body =
    'This is the main content of the article.' +
    'It is used to test article creation functionality.' +
    id;

  return { title, description, body };
}

module.exports = { createArticle };
