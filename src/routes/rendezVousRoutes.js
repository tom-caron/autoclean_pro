const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const verifyToken = require('../middlewares/authMiddleware');
const rendezVousController = require('../controllers/rendezVousController')

router.get('/prendre-rdv', verifyToken, rendezVousController.getRDVForm);

router.post('/create', verifyToken, rendezVousController.creerRendezVous);


module.exports = router;