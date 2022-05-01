const { Sequelize  } = require('sequelize');
//var tools = require('./Entity/Employee');
// Option 2: Passing parameters separately (other dialects)
var sequelize = new Sequelize('blockbr', 'root', '1234', {
  logging: false,
  host: 'localhost',
  dialect: 'mysql'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

sequelize.authenticate();//await
//sequelize.close();
console.log('Connection has been established successfully.');

module.exports = {sequelize};