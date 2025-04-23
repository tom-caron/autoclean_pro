const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const verifyToken = require('../middlewares/authMiddleware');
const rendezVousController = require('../controllers/rendezVousController')
const verifyClient = require('../middlewares/verifyClient')

router.get('/prendre-rdv', verifyToken, verifyClient, rendezVousController.getRDVForm);

router.post('/create', verifyToken, verifyClient, rendezVousController.creerRendezVous);


module.exports = router;