const { Sequelize } = require('sequelize');

module.exports = new Sequelize('PSKP_Lab24', 'sa', '1111', {
  dialect: 'mssql',
  host: 'DESKTOP-8HNL9IM',
  port: 1433,
  define: {
    timestamps: false,
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});
