const authService = require('../services/authService');

module.exports = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {

    const user = authService.verifyToken(token);
    if (user && !user.role) {
      return res.redirect('/');
    }
  }

  next();
};