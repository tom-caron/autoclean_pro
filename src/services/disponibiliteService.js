// services/disponibiliteService.js
const { Op } = require('sequelize');
const DisponibilitesEmployes = require('../models/disponibilites_employes');
const RendezVous = require('../models/rendez_vous');
const disponibiliteRepository = require('../repositories/disponibiliteRepository')

const disponibiliteService = {
    getCreneauxDisponiblesPourEmploye : async (employe_id, date) => {
        const disponibilites = await disponibiliteRepository.findDispoByDateAndEmploye(employe_id, date);

        const rdvs = await RendezVous.findAll({
            where: {
            employe_id,
            date_heure: {
                [Op.between]: [`${date} 00:00:00`, `${date} 23:59:59`]
            }
            }
        });

        const horairesOccupes = new Set(rdvs.map(r => r.date_heure.toISOString().slice(11, 16)));

        const creneaux = [];

        disponibilites.forEach(dispo => {
            let heure = dispo.heure_debut;
            while (heure < dispo.heure_fin) {
            if (!horairesOccupes.has(heure)) {
                creneaux.push({ heure });
            }

            const [h, m] = heure.split(':').map(Number);
            const next = new Date(0, 0, 0, h, m + 30);
            heure = `${String(next.getHours()).padStart(2, '0')}:${String(next.getMinutes()).padStart(2, '0')}`;
            }
        });

        return creneaux;
}

};

module.exports = disponibiliteService;