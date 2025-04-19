// middlewares/checkNotAuthenticated.js
const authService = require('../services/authService');

module.exports = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const user = authService.verifyToken(token);
      if (user) {
        return res.redirect('/');
      }
    } catch (err) {
    }
  }

  next();
};
