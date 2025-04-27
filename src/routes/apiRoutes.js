const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const disponibiliteService = require('../services/disponibiliteService')
const employeRepository = require('../repositories/employeRepository')
const rendezVousController = require('../controllers/rendezVousController')

router.get('/disponibilites/:employe_id/:date', async (req, res) => {
    const { employe_id, date } = req.params;
    const creneauxDispo = await disponibiliteService.getCreneauxDisponiblesPourEmploye(employe_id, date);
    res.json(creneauxDispo);
  });


  router.get('/employes/:agenceId', async (req, res) => {
    try {
      const { agenceId } = req.params;
      const employes = await employeRepository.findEmployeByAgenceId(agenceId);
      res.json(employes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la récupération des employés." });
    }
  });

router.get('/rendez-vous', verifyToken, rendezVousController.getRendezVousBetweenDates);

  
  
  

  module.exports = router;