const checkRoles = (role) => {
  return function (req, res, next) {
    if (req.session.currentUser.role === role) {
      return next();
    } else {
      res.redirect('/');
    }
  };
};

const checkGuest = checkRoles('GUEST');

const checkAdmin = checkRoles('ADMIN');
module.exports = {
  checkGuest,
  checkAdmin,
};
