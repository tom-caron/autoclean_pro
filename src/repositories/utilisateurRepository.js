const Utilisateurs = require('../models/utilisateurs');

const utilisateurRepository = {

    createUtilisateur : async ({ nom, prenom, email, mot_de_passe, telephone, adresse }) => {
        
        const newUser = await Utilisateurs.create({
          nom,
          prenom,
          email,
          mot_de_passe,
          telephone,
          adresse,
        });
        return newUser;
      },

      findUtilisateurByEmail : async (email) => {
        return await Utilisateurs.findOne({ where: { email } });
      },
}



module.exports = utilisateurRepository;