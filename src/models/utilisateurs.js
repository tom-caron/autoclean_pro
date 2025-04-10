const { DataTypes, Sequelize } = require("sequelize");
const db = require('../../config/database');
const Agences = require('./agences');

// models/utilisateurs.js
const Utilisateurs = db.sequelize.define("Utilisateurs", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
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
      allowNull: true,
      references: {
              model: Agences,
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

  Agences.hasMany(Utilisateurs, {
    foreignKey: 'agence_favorie_id',
    as: 'utilisateurs_favoris'
  });
  Utilisateurs.belongsTo(Agences, {
    foreignKey: 'agence_favorie_id',
    as: 'agence_favorie'
  });

  module.exports = Utilisateurs;