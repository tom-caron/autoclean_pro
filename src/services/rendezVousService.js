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
      },

      getAllRDVPassByUserId: async (utilisateur_id, dateRDV) => {
        return await rendezVousRepository.findAllRDVPassByUserId(utilisateur_id, dateRDV);
      },
    
      getAllRDVFuturByUserId: async (utilisateur_id, dateRDV) => {
        return await rendezVousRepository.findAllRDVFuturByUserId(utilisateur_id, dateRDV);
      },

      annulerRendezVous: async (rendezVousId) => {
        return await rendezVousRepository.deleteRendezVous(rendezVousId);
    },

    getRendezVousBetweenDates : async (startDate, endDate) => {
      const rendezVous = await rendezVousRepository.findRendezVousBetweenDates(startDate, endDate);
    
      const now = new Date();
    
      const rendezVousFutur = rendezVous.filter(rdv => new Date(rdv.date_heure) >= now);
      const rendezVousPass = rendezVous.filter(rdv => new Date(rdv.date_heure) < now);
    
      return { rendezVousFutur, rendezVousPass };
    },


}



module.exports = rendezVousService;