const { DataTypes, Sequelize } = require("sequelize");
const db = require('../../config/database');
const Agences = require('./agences');

// models/stocks.js
const Stocks = db.sequelize.define("Stocks", {
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
              model: Agence,
              key: 'id'
          }
    },
    produit: {
      type: Sequelize.STRING,
    },
    quantite: {
      type: Sequelize.INTEGER,
    },
  }, {
    tableName: "stocks",
    timestamps: false,
  });

  // Définir les relations
Agence.hasMany(Stocks, {
  foreignKey: 'agence_id',
  as: 'stocks'
});
Stocks.belongsTo(Agences, {
  foreignKey: 'agence_id',
  as: 'agence'
});

  module.exports = Stocks;