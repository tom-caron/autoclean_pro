const { DataTypes, Sequelize } = require("sequelize");
const db = require('../../config/database');

// models/roles.js
const Roles = db.sequelize.define("Roles", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: "roles",
    timestamps: false,
  });

  module.exports = Roles;