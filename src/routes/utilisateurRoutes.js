const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const utilisateurController = require('../controllers/utilisateurController');
const redirectIfConnected = require('../middlewares/redirectIfConnected');
const redirectIfNotConnected = require('../middlewares/redirectIfNotConnected');
const redirectIfAdmins = require('../middlewares/redirectIfAdmins');
const verifyToken = require('../middlewares/authMiddleware');



//Inscription
router.get('/register', redirectIfConnected, (req, res) => {
    res.render('connexion/register', { user: req.user, visiteur: null });
});

router.post('/register', [
    body('nom').notEmpty().withMessage('Le nom est requis').isLength({ max: 50 }).withMessage('Le nom ne doit pas dépasser 50 caractères'),
    body('prenom').notEmpty().withMessage('Le prénom est requis').isLength({ max: 50 }).withMessage('Le prénom ne doit pas dépasser 50 caractères'),
    body('email').trim().isEmail().withMessage('Adresse e-mail invalide'),
    body('password')
        .isLength({ min: 8 }).withMessage('Le mot de passe doit contenir au moins 8 caractères')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).withMessage('Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre'),
    body('password_confirm').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Les mots de passe ne correspondent pas');
        }
        return true;
    }),

], utilisateurController.signUp);


//connexion
router.get('/login', redirectIfConnected, (req, res) => {
    res.render('connexion/login', { user: req.user, visiteur: null });
});

router.post('/login', utilisateurController.signIn);

//profile
router.get('/profile', redirectIfNotConnected, redirectIfAdmins, verifyToken, utilisateurController.getProfile);

router.get('/mes-rendez-vous', redirectIfNotConnected, redirectIfAdmins, verifyToken, utilisateurController.getMesRendezVous);

router.get('/settings', redirectIfNotConnected, verifyToken, redirectIfAdmins, utilisateurController.getSetting);

router.post('/setting', redirectIfNotConnected, verifyToken, redirectIfAdmins, [

    body('nomUser').notEmpty().withMessage('Le nom est requis').isLength({ max: 50 }).withMessage('Le nom ne doit pas dépasser 50 caractères'),
    body('prenomUser').notEmpty().withMessage('Le prénom est requis').isLength({ max: 50 }).withMessage('Le prénom ne doit pas dépasser 50 caractères'),
    body('emailUser').trim().isEmail().withMessage('Adresse e-mail invalide'),
    body('telUser').isLength({ max: 10 }).withMessage('Le numéro ne doit pas dépasser 10 chiffres'),

], utilisateurController.updateProfile);

//Déconnexion
router.get('/logout', utilisateurController.logout);

module.exports = router;