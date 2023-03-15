const pulpit = require('./pulpit');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('sequel', 'postgres', '1111', {
    host: 'localhost',
    dialect: 'postgres',
    define: { timestamps: false }
});


module.exports = faculty = sequelize.define(
    'faculty',
    {
        faculty: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
        faculty_name: { type: Sequelize.STRING, allowNull: false }
    },
    {
        sequelize,
        tableName: 'faculty'
    }
);


faculty.hasMany(pulpit, {
    foreignKey: 'faculty',
    sourceKey: 'faculty'
});