const RendezVous = require('../models/rendez_vous')
const RendezVousOption = require('../models/rendez_vous_options')


const rendezVousRepository = {

    create : async ({ utilisateur_id, agence_id, vehicule_id, employe_id, date_heure, type_nettoyage_id, prix_total }) => {

        const rendezVous = await RendezVous.create({
        utilisateur_id,
          agence_id,
          employe_id,
          vehicule_id,
          date_heure,
          type_nettoyage_id,
          prix_total,
        });
      
        return rendezVous;
      },

      ajouterOption: async (rendezVousId, optionId) => {
        // Vérifie d'abord si le rendez-vous existe
        const rendezVous = await RendezVous.findByPk(rendezVousId);

        if (!rendezVous) throw new Error('Rendez-vous introuvable');
    
        // Ajoute l'option à la table de liaison
        await RendezVousOption.create({
          rendez_vous_id: rendezVousId,
          option_id: optionId,
        });
      },
}



module.exports = rendezVousRepository;