// middlewares/ensureAdmin.js
const authService = require('../services/authService');

module.exports = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('connexion/login');
  }

  const user = authService.verifyToken(token);
  if (!user || user.role) {
    return res.redirect('/');
  }

  req.user = user; // tu peux le garder si tu veux l'utiliser plus tard
  next();
};
