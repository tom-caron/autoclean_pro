const { DataTypes, Sequelize } = require("sequelize");
const db = require('../../config/database');
const Agence = require('./agences');
const Role = require('./roles');

// models/employes.js
const Employes = db.sequelize.define("Employes", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    agence_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
              model: Agence,
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
    role_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
              model: Role,
              key: 'id'
          }
    },
  }, {
    tableName: "employes",
    timestamps: false,
  });

  // Définir les relations
Agence.hasMany(Employes, {
  foreignKey: 'agence_id',
  as: 'employes'
});
Employes.belongsTo(Agence, {
  foreignKey: 'agence_id',
  as: 'agence'
});

Role.hasMany(Employes, {
  foreignKey: 'role_id',
  as: 'employes'
});
Employes.belongsTo(Role, {
  foreignKey: 'role_id',
  as: 'role'
});
  
  module.exports = Employes;