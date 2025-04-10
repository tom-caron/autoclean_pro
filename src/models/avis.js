const { DataTypes, Sequelize } = require("sequelize");
const db = require('../../config/database');
const Utilisateurs = require('./utilisateurs');
const Agences = require('./agences');

// models/avis.js
const Avis = db.sequelize.define("Avis", {
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
    agence_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Agences,
        key: 'id'
    }
    },
    note: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    commentaire: {
      type: Sequelize.TEXT,
    },
    date_avis: {
      type: Sequelize.DATE,
      defaultValue: CURRENT_TIMESTAMP,
    },
  }, {
    tableName: "avis",
    timestamps: false,
  });
  
  // Définir les relations
Utilisateurs.hasMany(Avis, {
  foreignKey: 'utilisateur_id',
  as: 'avis'
});
Avis.belongsTo(Utilisateurs, {
  foreignKey: 'utilisateur_id',
  as: 'utilisateur'
});

Agences.hasMany(Avis, {
  foreignKey: 'agence_id',
  as: 'avis'
});
Avis.belongsTo(Agences, {
  foreignKey: 'agence_id',
  as: 'agence'
});
  
  module.exports = Avis;
