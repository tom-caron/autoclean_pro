const { validationResult } = require('express-validator');
const utilisateurService = require('../services/utilisateurService');
const authService = require ('../services/authService');
const employeService = require('../services/employeService')

const utilisateurController = {
    signUp: async (req, res) => {
      try {
        const errors = validationResult(req);
        const { nom, prenom, email, password, telephone, adresse } = req.body;

        if (!errors.isEmpty()) {

          console.log("Erreur dans le formulaire");
  
          return res.status(400).render('connexion/register', { errors: errors.array(), user: null, visiteur: { nom, prenom, email, telephone, adresse } });

        } else {  
          const newUser = await utilisateurService.createUtilisateur({
          nom,
          prenom,
          email,
          mot_de_passe: password,
          telephone,
          adresse
        });
  
        const token = authService.generateToken(newUser);
        res.cookie('token', token, { httpOnly: true });
        console.log("Inscription réussi");

          return res.status(201).redirect('/');
        }
      } catch (error) {
        console.error(error);
        return res.status(500).send('Erreur lors de l\'enregistrement de l\'utilisateur.');
      }
    },

    signIn: async (req, res) => {
      try {
        const { email, password } = req.body;
        const user = await utilisateurService.loginUtilisateur(email, password);
    
        const token = authService.generateToken(user);
        res.cookie('token', token, { httpOnly: true });

        if (user.role == 'client'){
          return res.redirect('/');
        }else {
          return res.redirect('/admin/dashboard');
        }

      } catch (error) {
        console.error(error.message);
        return res.status(401).render('connexion/login', {
          error: 'Email ou mot de passe incorrect',
          email: req.body.email,
          user: null,
          visiteur: null 
        });
      }
    },

    logout: (req, res) => {
      res.clearCookie('token');
      res.redirect('/');
    },

};

module.exports = utilisateurController;