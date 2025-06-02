function generateUser() {
  const randomNumber = Math.random().toString().slice(2);
  const userName = `test_mate_user${randomNumber}`;
  const email = userName + '@mail.com';
  const password = 'Test1234!';

  return { userName, email, password };
}

module.exports = { generateUser };
