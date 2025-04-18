const { DataTypes, Sequelize } = require("sequelize");
const db = require('../../config/database');

// models/types_nettoyage.js
const Types_nettoyages = db.sequelize.define("Types_nettoyage", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    libelle: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    prix_base: {
      type: Sequelize.FLOAT,
    },
  }, {
    tableName: "types_nettoyage",
    timestamps: false,
  });

  module.exports = Types_nettoyages;