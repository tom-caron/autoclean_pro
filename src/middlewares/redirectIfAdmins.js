const authService = require('../services/authService');

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  
  if (token) {
    const user = authService.verifyToken(token);
    if (user && (user.role === 2 || user.role === 1 )) {
      
      return res.redirect('/admin/dashboard');
    }
  }

  next();
};