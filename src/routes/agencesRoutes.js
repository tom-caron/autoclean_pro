const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middlewares/verifyAdmin');
const agenceController = require('../controllers/agenceController')

router.get('/setting', verifyAdmin, agenceController.getSettingAgence);

module.exports = router;