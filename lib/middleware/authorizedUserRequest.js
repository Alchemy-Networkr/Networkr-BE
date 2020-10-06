// check that the user who requested to delete/update a project is the user that created the project.


module.exports = (req, res, next) => {
  if(req.user.email === req.body.ownerEmail || req.user.role === 'ADMIN') {
    next(); 
  } else {
    throw new Error('You cannot update/delete this! Invalid User!');
  }
};
