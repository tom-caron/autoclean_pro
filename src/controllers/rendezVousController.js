const agenceRepository = require('../repositories/agenceRepository')
const typesNettoyagesRepository = require('../repositories/typeNettoyageRepository')
const optionsSupplementairesRepository = require('../repositories/optionSupplementaire')
const rendezVousService = require('../services/rendezVousService')
const vehiculesRepository = require('../repositories/vehiculeRepository')
const rendezVousRepository = require('../repositories/rendezVousRepository')

const rendezVousController = {
    getRDVForm: async (req, res) => {
        try {
          const agences = await agenceRepository.findAllAgence();
          const typesNettoyages = await typesNettoyagesRepository.findAllTypesNettoyages();
          const optionsSupplementaires = await optionsSupplementairesRepository.findAllOptionsSupplementaires();
          const vehicules = await vehiculesRepository.findAllVehiculesByUser(req.user.userId);
          return res.status(200).render('rendezVous', { user: req.user, agences, typesNettoyages, optionsSupplementaires, vehicules });
        } catch (error) {
          console.error(error);
          return res.status(500).send("Erreur lors du chargement du formulaire de rendez-vous.");
        }
      },


      creerRendezVous : async (req, res) => {
        try {

          const [year, month, day] = req.body.date.split('-'); // yyyy-MM-dd
          const [hour, minute] = req.body.creneau.split(':');  // HH:mm

          const combinedDateTime = new Date(
            year,
            month - 1, // En JS les mois commencent à 0 (Janvier = 0)
            day,
            hour,
            minute
          );

          combinedDateTime.setHours(combinedDateTime.getHours() + 2);

          const data = {
            utilisateur_id: req.user.userId,
            agence_id: req.body.agence_id,
            vehicule_id: req.body.vehicule_id,
            employe_id: req.body.employe_id,
            date_heure: combinedDateTime,
            creneau: req.body.creneau,
            type_nettoyage_id: req.body.type_nettoyage_id,
            options_supplementaires: req.body.options_supplementaires || [],
            prix_total: req.body.prix_total,
          };
      
          await rendezVousService.creerRendezVous(data);
          res.redirect('/');
        } catch (err) {
          console.error(err);
          res.status(500).send('Erreur lors de la création du rendez-vous');
        }
      },

      annulerRendezVous: async (req, res) => {
        const rendezVousId = req.params.rdvId;

        try {
          const rendezVous = await rendezVousRepository.findRDVById(rendezVousId);

          if (!rendezVous || rendezVous.utilisateur_id !== req.user.userId) {
            return res.status(403).send('Accès interdit.');
        }
          
        await rendezVousService.annulerRendezVous(rendezVousId);
            res.redirect('/users/mes-rendez-vous');
        } catch (error) {
            console.error('Erreur lors de l\'annulation du rendez-vous:', error);
            res.status(500).send('Erreur lors de l\'annulation du rendez-vous.');
        }
    },

    getRendezVousBetweenDates : async (req, res) => {
      try {
        const { startDate, endDate } = req.query;
    
        if (!startDate || !endDate) {
          return res.status(400).json({ error: "Les dates de début et de fin sont requises." });
        }
    
        const { rendezVousFutur, rendezVousPass } = await rendezVousService.getRendezVousBetweenDates(startDate, endDate);
    
        res.json({ rendezVousFutur, rendezVousPass });
    
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de la récupération des rendez-vous." });
      }
  }
      

};

module.exports = rendezVousController;