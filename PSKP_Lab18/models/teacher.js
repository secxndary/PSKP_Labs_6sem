const Sequelize = require('sequelize');
const sequelize = new Sequelize('sequel', 'postgres', '1111', { host: 'localhost', dialect: 'postgres' });

module.exports = teacher = sequelize.define(
    'teacher',
    {
        teacher: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
        teacher_name: { type: Sequelize.STRING, allowNull: false }
    },
    {
        sequelize,
        tableName: 'teacher',
        timestamps: false
    }
);