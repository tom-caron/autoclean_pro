const jwt = require('jsonwebtoken');

const authService = {
    generateToken : (user) => {
        const tokenData = {
          userId: user.id,
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
        };
      
        return jwt.sign(tokenData, 'votre_secret', { expiresIn: '5h' });
      },
}


module.exports = authService;