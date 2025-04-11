const agenceRepository = require('../repositories/agenceRepository')
const agenceRepository = require('../repositories/agenceRepository')

const agenceController = {
    getSettingAgence: async (req, res) => {
        try {
          const agence = await agenceRepository.findAgenceById();
          return res.status(200).render('admin/setting', { user: req.user, agence, typesNettoyages, optionsSupplementaires, vehicules });
        } catch (error) {
          console.error(error);
          return res.status(500).send("Erreur lors du chargement du formulaire de rendez-vous.");
        }
      },      

};

module.exports = agenceController;