const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./config/database');
const path = require('path');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;

//connexion à la BDD
db.connexion();

//utilisation du framework express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//appel des fichiers de route
const index = require('./src/routes/index');
const userRoutes = require('./src/routes/utilisateurRoutes');
const rendezVousRoutes = require('./src/routes/rendezVousRoutes');
const apiRoutes = require('./src/routes/apiRoutes');

app.use('/', index);
app.use('/users', userRoutes);
app.use('/rendez-vous', rendezVousRoutes);
app.use('/api', apiRoutes);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.static(path.join(__dirname, 'src', 'public')));

//le server ecoute sur
app.listen(PORT, () => console.log('Server started: 3000'));