const auditorium = require('./auditorium');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('sequel', 'postgres', '1111', { host: 'localhost', dialect: 'postgres' });


module.exports = auditorium_type = sequelize.define(
    'auditorium_type',
    {
        auditorium_type: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
        auditorium_typename: { type: Sequelize.STRING, allowNull: false }
    },
    {
        sequelize,
        tableName: 'auditorium_type',
        timestamps: false
    }
);


auditorium_type.hasMany(auditorium, {
    foreignKey: 'auditorium_type',
    sourceKey: 'auditorium_type'
})