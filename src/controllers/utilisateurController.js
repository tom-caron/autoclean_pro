const { validationResult } = require('express-validator');
const utilisateurService = require('../services/utilisateurService');
const authService = require ('../services/authService');
const employeService = require('../services/employeService');
const utilisateurRepository = require('../repositories/utilisateurRepository');
const agenceRepository = require('../repositories/agenceRepository');

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

    getSetting: async (req, res) => {
      try {
        const user = await utilisateurRepository.findUtilisateurById(req.user.userId);
        if (!user) {
          return res.status(404).redirect('/', { error: 'Utilisateur non trouvé', user: null, visiteur: null });
        }

        const agences = await agenceRepository.findAllAgence();

        return res.render('client/setting', { user, agences });


      } catch (error) {
        console.error(error);
        return res.status(500).redirect('/', { error: 'Erreur lors de la récupération du profil', user: null, visiteur: null });
      }
    },

    getProfile: async (req, res) => {
      try {
        const user = await utilisateurRepository.findUtilisateurById(req.user.userId);
        if (!user) {
          return res.status(404).redirect('/', { error: 'Utilisateur non trouvé', user: null });
        }

        return res.render('client/profile', { user });


      } catch (error) {
        console.error(error);
        return res.status(500).redirect('/', { error: 'Erreur lors de la récupération du profil', user: null});
      }
    },

    updateProfile: async (req, res) => {
      try {
        console.log("voici les données de l'update", req.body);
        const errors = validationResult(req);
        //condition si il y a une erreur dans le formulaire
        if (!errors.isEmpty()) {
          return res.status(400).render('client/profile', { errors: errors.array(), user: req.user });
        }
        const updatedUser = await utilisateurService.updateUtilisateurProfile(req);
  
        const token = authService.generateToken(updatedUser);

        res.clearCookie('token');
        res.cookie('token', token, { httpOnly: true });
  
        res.status(201).redirect('/users/profile');
      } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de l\'enregistrement de la l\'utilisateur.');
      }
    },

};

module.exports = utilisateurController;