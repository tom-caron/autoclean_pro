const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');

router.get('/', verifyToken, (req, res) => {
    res.render('index', { user: req.user });
  });

  module.exports = router;