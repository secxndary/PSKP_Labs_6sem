const teacher = require('./teacher');
const subject = require('./subject');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('sequel', 'postgres', '1111', {
    host: 'localhost',
    dialect: 'postgres',
    define: { timestamps: false }
});


module.exports = pulpit = sequelize.define(
    'pulpit',
    {
        pulpit: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
        pulpit_name: { type: Sequelize.STRING, allowNull: false },
    },
    {
        sequelize,
        tableName: 'pulpit',
    }
);


pulpit.hasMany(teacher, {
    foreignKey: 'pulpit',
    sourceKey: 'pulpit'
});

pulpit.hasMany(subject, {
    foreignKey: 'pulpit',
    sourceKey: 'pulpit'
});