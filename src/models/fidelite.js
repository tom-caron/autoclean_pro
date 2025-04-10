const { DataTypes, Sequelize } = require("sequelize");
const db = require('../../config/database');
const Utilisateurs = require('./utilisateurs');

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
      model: Utilisateurs,
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
Utilisateurs.hasOne(Fidelites, {
  foreignKey: 'utilisateur_id',
  as: 'fidelite'
});
Fidelites.belongsTo(Utilisateurs, {
  foreignKey: 'utilisateur_id',
  as: 'utilisateur'
});

module.exports = Fidelites;
