const Sequelize = require('sequelize');
const sequelize = new Sequelize('sequel', 'postgres', '1111', {
    host: 'localhost',
    dialect: 'postgres',
    define: { timestamps: false }
});


module.exports = subject = sequelize.define(
    'subject',
    {
        subject: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
        subject_name: { type: Sequelize.STRING, allowNull: false }
    },
    {
        sequelize,
        tableName: 'subject'
    }
);