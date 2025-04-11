const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  '',
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

module.exports = {
    connexion: async () => {
        //connection à la base de données
        try {
            await sequelize.authenticate();
            console.log('Connection has been established succesfully.');
        } catch (error) {
            console.error('Unable to connect to the database', error);
        }
        
    }, sequelize
}