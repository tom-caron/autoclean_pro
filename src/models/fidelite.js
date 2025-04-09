const { DataTypes, Sequelize } = require("sequelize");
const db = require('../../config/database');
const Utilisateur = require('./utilisateurs');

// models/fidelite.js
const Fidelites = db.sequelize.define("Fidelite", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  utilisateur_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Utilisateur,
      key: 'id'
    }
  },
  points: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  tableName: "fidelite",
  timestamps: false,
});

// Définir les relations
Utilisateur.hasOne(Fidelites, {
  foreignKey: 'utilisateur_id',
  as: 'fidelite'
});
Fidelites.belongsTo(Utilisateur, {
  foreignKey: 'utilisateur_id',
  as: 'utilisateur'
});

module.exports = Fidelites;
