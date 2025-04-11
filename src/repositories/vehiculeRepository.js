const { where } = require('sequelize');
const Vehicules = require('../models/vehicules')

const vehiculesRepository = {

      findAllVehiculesByUser : async (utilisateur_id) => {
        return await Vehicules.findAll({where: { utilisateur_id}});
      },
}



module.exports = vehiculesRepository;