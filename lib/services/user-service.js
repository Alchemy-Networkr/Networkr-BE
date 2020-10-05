// business file for verifying users jwt
const jwt = require('jsonwebtoken');

const verifyToken = token => {
  console.log(token);
  const user = jwt.decode(token, { complete: true });
  return user;
};

module.exports = {
  verifyToken
};
