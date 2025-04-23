const authService = require('../services/authService');

module.exports = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('connexion/login');
  }

  const user = authService.verifyToken(token);
  if (!user || user.role !== 2) {
    return res.redirect('/');
  }

  req.user = user;
  next();
};
