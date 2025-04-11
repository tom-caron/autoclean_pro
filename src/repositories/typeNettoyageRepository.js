const TypesNettoyages = require('../models/types_nettoyage')

const typesNettoyagesRepository = {

      findAllTypesNettoyages : async () => {
        return await TypesNettoyages.findAll();
      },
}



module.exports = typesNettoyagesRepository;