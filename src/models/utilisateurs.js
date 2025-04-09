const { DataTypes, Sequelize } = require("sequelize");
const db = require('../../config/database');
const Agence = require('./agences');
const Fidelite = require("./fidelite");

// models/utilisateurs.js
const Utilisateurs = db.sequelize.define("Utilisateurs", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    nom: {
      type: Sequelize.STRING,
    },
    prenom: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    mot_de_passe: {
      type: Sequelize.STRING,
    },
    telephone: {
      type: Sequelize.STRING,
    },
    adresse: {
      type: Sequelize.STRING,
    },
    agence_favorie_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
              model: Agence,
              key: 'id'
          }
    },
    photo_profil: {
      type: Sequelize.STRING,
    },
    langue_preferee: {
      type: Sequelize.STRING,
      defaultValue: 'FR',
    },
  }, {
    tableName: "utilisateurs",
    timestamps: true,
  });

  Agence.hasMany(Utilisateurs, {
    foreignKey: 'agence_favorie_id',
    as: 'utilisateurs_favoris'
  });
  Utilisateurs.belongsTo(Agence, {
    foreignKey: 'agence_favorie_id',
    as: 'agence_favorie'
  });

  module.exports = Utilisateurs;