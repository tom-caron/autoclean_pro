const Agences = require('../models/agences')

const agenceRepository = {

      findAllAgence : async () => {
        return await Agences.findAll();
      },
}



module.exports = agenceRepository;