const RendezVous = require('../models/rendez_vous')
const RendezVousOption = require('../models/rendez_vous_options')
const Agences = require('../models/agences')
const Employes = require('../models/employes')
const TypeNettoyages = require('../models/types_nettoyage')
const Vehicules = require('../models/vehicules')
const { Op } = require('sequelize');



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

      findRDVById : async (rendezVousId) => {
        return await RendezVous.findByPk(rendezVousId);
      },

      findAllRDVByUserId : async (utilisateur_id) => {
        return await RendezVous.findAll({where: { utilisateur_id}});
      },

      findAllRDVPassByUserId: async (utilisateur_id, dateRDV) => {
        return await RendezVous.findAll({
          where: {
            utilisateur_id,
            date_heure: {
              [Op.lt]: new Date(dateRDV)  // Sélectionne les rendez-vous avant la date passée en paramètre
            }
          },
          include: [
            { model: Agences, as: 'agence' },
            { model: Employes, as: 'employe' },
            { model: TypeNettoyages, as: 'type_nettoyage' },
            { model: Vehicules, as: 'vehicule', attributes: ['marque', 'modele'] },

          ],
          order: [['date_heure', 'ASC']]  // Tri décroissant par date
        })
      },

      findAllRDVFuturByUserId: async (utilisateur_id, dateRDV) => {
        return await RendezVous.findAll({
          where: {
            utilisateur_id,
            date_heure: {
              [Op.gt]: new Date(dateRDV)  // Sélectionne les rendez-vous après la date passée en paramètre
            }
          },
          include: [
            { model: Agences, as: 'agence' },
            { model: Employes, as: 'employe' },
            { model: TypeNettoyages, as: 'type_nettoyage' },
            { model: Vehicules, as: 'vehicule', attributes: ['marque', 'modele'] },

          ],
          order: [['date_heure', 'ASC']]  // Tri décroissant par date
        });
      },

      deleteRendezVous: async (id) => {
        return await RendezVous.destroy({ where: { id } });
    },

    findRendezVousBetweenDates : async (startDate, endDate) => {
      return await RendezVous.findAll({
        where: {
          date_heure: {
            [Op.between]: [startDate, endDate]
          }
        },
        include: [
          { model: Agences, as: 'agence', attributes: ['nom'] },
          { model: Employes, as: 'employe', attributes: ['prenom', 'nom'] },
          { model: TypeNettoyages, as: 'type_nettoyage', attributes: ['libelle'] },
          { model: Vehicules, as: 'vehicule', attributes: ['marque', 'modele'] },

        ],
        order: [['date_heure', 'ASC']]
      });
    }

}



module.exports = rendezVousRepository;