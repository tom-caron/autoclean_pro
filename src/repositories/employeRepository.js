const Employes = require('../models/employes')

const employeRepository = {

    findEmployeByAgenceId: async (agenceId) => {
        if (!agenceId) throw new Error("agenceId manquant ou invalide");
        return await Employes.findAll({
          where: {
            agence_id: agenceId,
            id_role: 3
          }
        });
      },

      findEmployeByEmail : async (email) => {
        return await Employes.findOne({ where: { email } });
      },

}

module.exports = employeRepository;