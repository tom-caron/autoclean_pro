const { DataTypes, Sequelize } = require("sequelize");
const db = require('../../config/database');
const Utilisateur = require('./utilisateurs');
const Agence = require('./agences');

// models/avis.js
const Avis = db.sequelize.define("Avis", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    utilisateur_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Utilisateur,
        key: 'id'
    }
    },
    agence_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Agence,
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
Utilisateur.hasMany(Avis, {
  foreignKey: 'utilisateur_id',
  as: 'avis'
});
Avis.belongsTo(Utilisateur, {
  foreignKey: 'utilisateur_id',
  as: 'utilisateur'
});

Agence.hasMany(Avis, {
  foreignKey: 'agence_id',
  as: 'avis'
});
Avis.belongsTo(Agence, {
  foreignKey: 'agence_id',
  as: 'agence'
});
  
  module.exports = Avis;
