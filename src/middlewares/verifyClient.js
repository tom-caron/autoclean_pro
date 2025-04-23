const authService = require('../services/authService');

module.exports = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/users/login');
  }

  const user = authService.verifyToken(token);
  if (!user || user.role) {
    return res.redirect('/');
  }

  req.user = user;
  next();
};
