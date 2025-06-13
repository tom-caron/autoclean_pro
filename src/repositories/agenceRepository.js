const Agences = require('../models/agences')

const agenceRepository = {

      findAllAgence : async () => {
        return await Agences.findAll();
      },

      findAgenceById : async (agenceId) => {
        return await Agences.findByPk(agenceId)
      },

      findAgenceBytest : async (agenceId) => {
        return await Agences.findByPk(agenceId)
      }
}

foo = 123

module.exports = agenceRepository;