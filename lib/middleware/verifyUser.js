// verifyUser
// set req.user to include users credentials 


// const Service = require('../services/user-service');

// module.exports = (req, res, next) => {
//   try {
//     // read the session cookie -> token
//     const token = req.cookies.session;
//     //verify token -> payload(user)
//     const payload = Service.verifyToken(token);
//     //attaching the user to req.user
//     req.user = {
//       id: payload.id,
//       email: payload.email
//     };
//     //next if anything it goes right
//     next();
//     //next if an error happens
//   } catch(error) {
//     next(error);
//   }
// };
