const { DataTypes, Sequelize } = require("sequelize");
const db = require('../../config/database');
const Utilisateur = require('./utilisateurs');
const Agence = require('./agences');
const Vehicule = require('./vehicules');
const Type_nettoyage = require('./types_nettoyage');
const Employe = require('./employes');

// models/rendez_vous.js
const Rendez_vous = db.sequelize.define("Rendez_vous", {
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
    vehicule_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Vehicule,
        key: 'id'
    }
    },
    type_nettoyage_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Type_nettoyage,
        key: 'id'
    }
    },
    employe_id: {
      type: Sequelize.INTEGER,
      defaultValue: NULL,
      references: {
        model: Employe,
        key: 'id'
    }
    },
    date_heure: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    statut: {
      type: Sequelize.STRING,
    },
  }, {
    tableName: "rendez_vous",
    timestamps: false,
  });

  // Définir les relations
Utilisateur.hasMany(Rendez_vous, {
  foreignKey: 'utilisateur_id',
  as: 'rendez_vous'
});
Rendez_vous.belongsTo(Utilisateur, {
  foreignKey: 'utilisateur_id',
  as: 'utilisateur'
});

Agence.hasMany(Rendez_vous, {
  foreignKey: 'agence_id',
  as: 'rendez_vous'
});
Rendez_vous.belongsTo(Agence, {
  foreignKey: 'agence_id',
  as: 'agence'
});

Vehicule.hasMany(Rendez_vous, {
  foreignKey: 'vehicule_id',
  as: 'rendez_vous'
});
Rendez_vous.belongsTo(Vehicule, {
  foreignKey: 'vehicule_id',
  as: 'vehicule'
});

Type_nettoyage.hasMany(Rendez_vous, {
  foreignKey: 'type_nettoyage_id',
  as: 'rendez_vous'
});
Rendez_vous.belongsTo(Type_nettoyage, {
  foreignKey: 'type_nettoyage_id',
  as: 'type_nettoyage'
});

Employe.hasMany(Rendez_vous, {
  foreignKey: 'employe_id',
  as: 'rendez_vous'
});
Rendez_vous.belongsTo(Employe, {
  foreignKey: 'employe_id',
  as: 'employe'
});

  module.exports = Rendez_vous;