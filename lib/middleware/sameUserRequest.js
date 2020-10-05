// check that the user who requested to delete/update a project is the user that created the project.


module.exports = (req, res, next) => {
  try {
    if(req.body.email === req.user.email) {
      next();
    } else {
      throw new Error('invalid user');
    }
  } catch(error) {
    next(error);
  }
};
