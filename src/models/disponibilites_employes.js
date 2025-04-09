const { DataTypes, Sequelize } = require("sequelize");
const db = require('../../config/database');
const Employe = require('./employes');

// models/disponibilites_employes.js
const Disponibilites_employes = db.sequelize.define("Disponibilites_employes", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    id_employe: {
      type: Sequelize.INTEGER,
      allowNull: false,
            references: {
              model: Employe,
              key: 'id'
            }
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    heure_debut: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    heure_fin: {
      type: Sequelize.TIME,
      allowNull: false,
    },
  }, {
    tableName: "disponibilites_employes",
    timestamps: false,
  });

  // Définir les relations
Employe.hasMany(Disponibilites_employes, {
  foreignKey: 'id_employe',
  as: 'disponibilites'
});
Disponibilites_employes.belongsTo(Employe, {
  foreignKey: 'id_employe',
  as: 'employe'
});
  
  module.exports = Disponibilites_employes;

