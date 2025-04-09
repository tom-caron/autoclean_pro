const { DataTypes, Sequelize } = require("sequelize");
const db = require('../../config/database');
const Rendez_vous = require('./rendez_vous');
const Option_supplementaire = require('./options_supplementaires');

// models/rendez_vous_options.js
const Rendez_vous_options = db.sequelize.define("Rendez_vous_options", {
    rendez_vous_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
              model: Rendez_vous,
              key: 'id'
          }
    },
    option_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
              model: Option_supplementaire,
              key: 'id'
          }
    },
  }, {
    tableName: "rendez_vous_options",
    timestamps: false,
  });

  Rendez_vous.belongsToMany(Option_supplementaire, {
    through: Rendez_vous_options,
    foreignKey: 'rendez_vous_id',
    otherKey: 'option_id',
    as: 'options_supplementaires'
  });
  
  Option_supplementaire.belongsToMany(Rendez_vous, {
    through: Rendez_vous_options,
    foreignKey: 'option_id',
    otherKey: 'rendez_vous_id',
    as: 'rendez_vous'
  });

  module.exports = Rendez_vous_options;