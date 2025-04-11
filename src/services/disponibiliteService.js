// services/disponibiliteService.js
const { Op } = require('sequelize');
const DisponibilitesEmployes = require('../models/disponibilites_employes');
const RendezVous = require('../models/rendez_vous');
const disponibiliteRepository = require('../repositories/disponibiliteRepository')

const disponibiliteService = {
    getCreneauxDisponiblesPourEmploye: async (employe_id, date) => {
      // Récupérer les disponibilités
      const disponibilites = await disponibiliteRepository.findDispoByDateAndEmploye(employe_id, date);
  
      // Récupérer les rendez-vous existants pour cette date et cet employé
      const rdvs = await RendezVous.findAll({
        where: {
          employe_id,
          date_heure: {
            [Op.between]: [`${date} 00:00:00`, `${date} 23:59:59`]
          }
        }
      });
  
      // Créer un ensemble des horaires déjà occupés (au format "HH:mm")
      const horairesOccupes = new Set(rdvs.map(r => r.date_heure.toISOString().slice(11, 16)));
  
      // Initialiser un tableau pour les créneaux disponibles
      const creneaux = [];
  
      // Vérifier les créneaux disponibles
      disponibilites.forEach(dispo => {
        let heure = dispo.heure_debut;
  
        // Tant que l'heure de début du créneau est avant l'heure de fin
        while (heure < dispo.heure_fin) {
          // Si ce créneau n'est pas occupé
          if (!horairesOccupes.has(heure)) {
            creneaux.push({ heure });
          }
  
          // Passer à la demi-heure suivante
          const [h, m] = heure.split(':').map(Number);
          const next = new Date(0, 0, 0, h, m + 30); // Ajouter 30 minutes
          heure = `${String(next.getHours()).padStart(2, '0')}:${String(next.getMinutes()).padStart(2, '0')}`;
        }
      });
  
      return creneaux; // Retourner les créneaux disponibles
    }
  };
  

module.exports = disponibiliteService;