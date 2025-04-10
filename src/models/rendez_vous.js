const { DataTypes, Sequelize } = require("sequelize");
const db = require('../../config/database');
const Utilisateurs = require('./utilisateurs');
const Agences = require('./agences');
const Vehicules = require('./vehicules');
const Type_nettoyages = require('./types_nettoyage');
const Employes = require('./employes');

// models/rendez_vous.js
const Rendez_vous = db.sequelize.define("Rendez_vous", {
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
Utilisateurs.hasMany(Rendez_vous, {
  foreignKey: 'utilisateur_id',
  as: 'rendez_vous'
});
Rendez_vous.belongsTo(Utilisateurs, {
  foreignKey: 'utilisateur_id',
  as: 'utilisateur'
});

Agences.hasMany(Rendez_vous, {
  foreignKey: 'agence_id',
  as: 'rendez_vous'
});
Rendez_vous.belongsTo(Agences, {
  foreignKey: 'agence_id',
  as: 'agence'
});

Vehicules.hasMany(Rendez_vous, {
  foreignKey: 'vehicule_id',
  as: 'rendez_vous'
});
Rendez_vous.belongsTo(Vehicules, {
  foreignKey: 'vehicule_id',
  as: 'vehicule'
});

Type_nettoyages.hasMany(Rendez_vous, {
  foreignKey: 'type_nettoyage_id',
  as: 'rendez_vous'
});
Rendez_vous.belongsTo(Type_nettoyages, {
  foreignKey: 'type_nettoyage_id',
  as: 'type_nettoyage'
});

Employes.hasMany(Rendez_vous, {
  foreignKey: 'employe_id',
  as: 'rendez_vous'
});
Rendez_vous.belongsTo(Employes, {
  foreignKey: 'employe_id',
  as: 'employe'
});

  module.exports = Rendez_vous;