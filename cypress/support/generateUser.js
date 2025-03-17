
function generateUser() {
  const randomNumber = Math.random().toString().slice(2, 6);
  const username = 'randomuserrr' + '_' + randomNumber;
  const email = username + '@mail.com';
  const password = 'Passwrod1234!';

  return {
    username,
    email,
    password
  };
};

module.exports = { generateUser };
