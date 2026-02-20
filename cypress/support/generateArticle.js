function generateArticle() {
  const id = Date.now();
  const title = `Article ${id}`;
  const description = `Short description ${id}`;
  const text = `This article was created by automated tests. It demonstrates creating and deleting an article. Timestamp: ${id}.`;
  const tags = ['cypress', 'e2e', `automation`];

  return { title, description, text, tags };
}

module.exports = {
  generateArticle
};
