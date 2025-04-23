const employeRepository = require('../repositories/employeRepository')
const agenceRepository = require('../repositories/agenceRepository')

const employeController = {
    getDashboard: async (req, res) => {
        try {
          const agence = await agenceRepository.findAgenceById(req.user.agenceId);
          return res.status(200).render('admin/dashboard', { user: req.user, agence});
        } catch (error) {
          console.error(error);
          return res.status(500).send("Erreur lors du chargement du dashboard.");
        }
      },      

};

module.exports = employeController;