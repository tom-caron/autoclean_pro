const bcrypt = require('bcryptjs');
const utilisateurRepository = require('../repositories/utilisateurRepository')

const utilisateurService = {

    createUtilisateur : async ({ nom, prenom, email, mot_de_passe, telephone, adresse }) => {
        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

        const newUser = await utilisateurRepository.createUtilisateur({
          nom,
          prenom,
          email,
          hashedPassword,
          telephone,
          adresse,
        });
        return newUser;
      },

      loginUtilisateur : async (email, password) => {
        const user = await utilisateurRepository.findByEmail(email);
        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }
      
        const match = await bcrypt.compare(password, user.mot_de_passe);
        if (!match) {
            throw new Error("Mot de passe incorrect");

        }
      
        return user;
      }
}



module.exports = utilisateurService;