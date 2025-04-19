const jwt = require('jsonwebtoken');

const authService = {
    generateToken : (user) => {
        const tokenData = {
          userId: user.id,
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          role: user.id_role
        };
      
        return jwt.sign(tokenData, 'votre_secret', { expiresIn: '5h' });
      },

      verifyToken: (token) => {
        try {
            return jwt.verify(token, 'votre_secret');
        } catch (err) {
            return null; // Token invalide ou expiré
        }
    },
    

}


module.exports = authService;