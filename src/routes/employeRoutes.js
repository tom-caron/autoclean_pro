const express = require('express');
const router = express.Router();
const employeController = require('../controllers/employeController');
const redirectIfNotConnected = require('../middlewares/redirectIfNotConnected');
const redirectIfClient = require('../middlewares/redirectIfClient');
const verifyToken = require('../middlewares/authMiddleware');


router.get('/dashboard', redirectIfNotConnected, redirectIfClient, verifyToken, employeController.getDashboard);

module.exports = router;