const { DataTypes, Sequelize } = require("sequelize");
const db = require('../../config/database');

// models/agences.js
const Agences = db.sequelize.define("Agences", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: Sequelize.STRING,
    },
    adresse: {
      type: Sequelize.STRING,
    },
    ville: {
      type: Sequelize.STRING,
    },
    code_postal: {
      type: Sequelize.STRING,
    },
    telephone: {
      type: Sequelize.STRING,
    },
    url_localisation: {
      type: Sequelize.STRING,
    },
  }, {
    tableName: "agences",
    timestamps: false,
  });

  module.exports = Agences;