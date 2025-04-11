const rendezVousRepository = require('../repositories/rendezVousRepository')

const rendezVousService = {

    creerRendezVous : async (data) => {
        const { vehicule_id, utilisateur_id, agence_id, employe_id, date_heure, type_nettoyage_id, prix_total, options_supplementaires } = data;
      
        // Crée le rendez-vous principal
        const rendezVous = await rendezVousRepository.create({
        utilisateur_id,
          agence_id,
          employe_id,
          vehicule_id,
          date_heure,
          type_nettoyage_id,
          prix_total,
        });
      
        // Lier les options supplémentaires, si besoin
        if (options_supplementaires.length > 0) {
          for (const optionId of Array.isArray(options_supplementaires) ? options_supplementaires : [options_supplementaires]) {
            await rendezVousRepository.ajouterOption(rendezVous.id, optionId);
          }
        }
      
        return rendezVous;
      }
}



module.exports = rendezVousService;