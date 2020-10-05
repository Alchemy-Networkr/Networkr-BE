// check that the user who requested to delete/update a project is the user that created the project.


// module.exports = (req, res, next) => {
//   try {
//     if(Number(req.body.userId) === Number(req.user.id)) {
//       next();
//     } else {
//       throw new Error('invalid user');
//     }
//   } catch(error) {
//     next(error);
//   }
// };
