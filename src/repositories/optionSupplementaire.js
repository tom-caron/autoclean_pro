const OptionsSupplementaires = require('../models/options_supplementaires')

const optionsSupplementairesRepository = {

      findAllOptionsSupplementaires : async () => {
        return await OptionsSupplementaires.findAll();
      },
}



module.exports = optionsSupplementairesRepository;