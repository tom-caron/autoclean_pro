const DisponibilitesEmployes = require('../models/disponibilites_employes')

const disponibiliteRepository = {

      findDispoByDateAndEmploye : async (employe_id, date) => {
        return await DisponibilitesEmployes.findAll({ where: { id_employe: employe_id, date: date } });
      },
}



module.exports = disponibiliteRepository;