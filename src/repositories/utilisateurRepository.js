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

      findUtilisateurById : async (idUser) => {
        return await Utilisateurs.findByPk(idUser);
      },

      logout: (req, res) => {
        res.clearCookie('token');
      },

      update: async (id, data) => {
        const user = await Utilisateurs.findByPk(id);
        if (!user) {
          return null;
        }
    
        user.nom = data.nom || user.nom;
        user.prenom = data.prenom || user.prenom;
        user.email = data.email || user.email;
        user.telephone = data.telephone || user.telephone;
        user.adresse = data.adresse || user.adresse;
        user.agence_favorie_id = data.agence_favorie || user.agence_favorie;
        user.langue_preferee = data.langue_preferee || user.langue_preferee;
    
        await user.save();
        return user;
      }
    
}



module.exports = utilisateurRepository;