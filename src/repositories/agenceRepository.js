const Agences = require('../models/agences')

const agenceRepository = {

      findAllAgence : async () => {
        return await Agences.findAll();
      },

      findAgenceById : async (agenceId) => {
        return await Agences.findByPk(
          
          
          
          
              agenceId)
      }
}


module.exports = agenceRepository;