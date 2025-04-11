const { DataTypes, Sequelize } = require("sequelize");
const db = require('../../config/database');
const Agences = require('../models/agences')

// models/agences.js
const Agence_horaires = db.sequelize.define("Agence_horaires", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    agences_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: Agences,
          key: 'id'
      },
    },
    jour_semaine: {
      type: Sequelize.STRING,
    },
    heure_debut: {
      type: Sequelize.TIME,
      defaultValue: '08:00:00',
    },
    heure_fin: {
        type: Sequelize.TIME,
        defaultValue: '18:00:00',
      },
    est_ferme: {
      type: Sequelize.BOOL,
      defaultValue: 0,

    },
  }, {
    tableName: "agences",
    timestamps: false,
  });

  // Définir les relations
Agences.hasMany(Agence_horaires, {
    foreignKey: 'agences_id',
    as: 'agence_horaire'
  });
  Agence_horaires.belongsTo(Agences, {
    foreignKey: 'agences_id',
    as: 'agence'
  });

  module.exports = Agence_horaires;