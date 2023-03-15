const Sequelize = require('sequelize');
const sequelize = new Sequelize('sequel', 'postgres', '1111', { host: 'localhost', dialect: 'postgres' });

module.exports = auditorium = sequelize.define(
    'auditorium',
    {
        auditorium: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
        auditorium_name: { type: Sequelize.STRING, allowNull: false },
        auditorium_capacity: { type: Sequelize.INTEGER, allowNull: false }
    },
    {
        sequelize,
        tableName: 'auditorium',
        timestamps: false
    }
);