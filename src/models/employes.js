const { DataTypes, Sequelize } = require("sequelize");
const db = require('../../config/database');
const Agences = require('./agences');
const Roles = require('./roles');

// models/employes.js
const Employes = db.sequelize.define("Employes", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    agence_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
              model: Agences,
              key: 'id'
          }
    },
    nom: {
      type: Sequelize.STRING,
    },
    prenom: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    telephone: {
      type: Sequelize.STRING,
    },
    id_role: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
              model: Roles,
              key: 'id'
          }
    },
  }, {
    tableName: "employes",
    timestamps: false,
  });

  // Définir les relations
Agences.hasMany(Employes, {
  foreignKey: 'agence_id',
  as: 'employes'
});
Employes.belongsTo(Agences, {
  foreignKey: 'agence_id',
  as: 'agence'
});

Roles.hasMany(Employes, {
  foreignKey: 'id_role',
  as: 'employes'
});
Employes.belongsTo(Roles, {
  foreignKey: 'id_role',
  as: 'role'
});
  
  module.exports = Employes;