const { DataTypes, Sequelize } = require("sequelize");
const db = require('../../config/database');
const Utilisateurs = require("./utilisateurs");

// models/vehicules.js
const Vehicules = db.sequelize.define("Vehicules", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    utilisateur_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Utilisateurs,
        key: 'id'
    }
    },
    marque: {
      type: Sequelize.STRING,
    },
    modele: {
      type: Sequelize.STRING,
    },
    immatriculation: {
      type: Sequelize.STRING,
    },
    type_vehicule: {
      type: Sequelize.STRING,
    },
  }, {
    tableName: "vehicules",
    timestamps: false,
  });

// Définir les relations
Utilisateurs.hasMany(Vehicules, {
  foreignKey: 'utilisateur_id',
  as: 'vehicules'
});
Vehicules.belongsTo(Utilisateurs, {
  foreignKey: 'utilisateur_id',
  as: 'utilisateur'
});

module.exports = Vehicules;