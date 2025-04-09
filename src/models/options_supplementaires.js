const { DataTypes, Sequelize } = require("sequelize");
const db = require('../../config/database');

// models/options_supplementaires.js
const Options_supplementaires = db.sequelize.define("Options_supplementaires", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    libelle: {
      type: Sequelize.STRING,
    },
    prix: {
      type: Sequelize.INTEGER,
    },
  }, {
    tableName: "options_supplementaires",
    timestamps: false,
  });

  module.exports = Options_supplementaires;