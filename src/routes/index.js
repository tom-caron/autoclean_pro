const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const redirectIfAdmins = require('../middlewares/redirectIfAdmins');


router.get('/', redirectIfAdmins, (req, res) => {
    res.render('index', { user: req.user });
  });

  module.exports = router;