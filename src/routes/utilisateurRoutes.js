const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const utilisateurController = require('../controllers/utilisateurController');
const checkNotAuthenticated = require('../middlewares/checkNotAuthenticated');



//Inscription
router.get('/register', checkNotAuthenticated, (req, res) => {
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
router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('connexion/login', { user: req.user, visiteur: null });
});

router.post('/login', utilisateurController.signIn);


//Déconnexion
router.post('/logout', utilisateurController.logout);

module.exports = router;