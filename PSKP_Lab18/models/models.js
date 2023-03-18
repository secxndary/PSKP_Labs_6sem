import { Sequelize, Op } from 'sequelize';
const sequelize = new Sequelize('sequel', 'postgres', '1111', { host: 'localhost', dialect: 'postgres', define: { timestamps: false } });



const teacher = sequelize.define(
    'teacher',
    {
        teacher: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
        teacher_name: { type: Sequelize.STRING, allowNull: false }
    },
    {
        sequelize,
        tableName: 'teacher'
    }
);



const subject = sequelize.define(
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



const pulpit = sequelize.define(
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



const faculty = sequelize.define(
    'faculty',
    {
        faculty: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
        faculty_name: { type: Sequelize.STRING, allowNull: false }
    },
    {
        sequelize,
        tableName: 'faculty',
        hooks: {
            beforeCreate: (fac, options) => { console.log('----- Data to insert: ', fac.dataValues); },
            afterCreate: (fac, options) => { console.log('----- Inserted data:  ', fac.dataValues); }
        }
    }
);
faculty.hasMany(pulpit, {
    foreignKey: 'faculty',
    sourceKey: 'faculty'
});



const auditorium = sequelize.define(
    'auditorium',
    {
        auditorium: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
        auditorium_name: { type: Sequelize.STRING, allowNull: false },
        auditorium_capacity: { type: Sequelize.INTEGER, allowNull: false }
    },
    {
        sequelize,
        tableName: 'auditorium',
        timestamps: false,
        scopes: {
            greaterThan60: {
                where: { auditorium_capacity: { [Op.gt]: 60 } }
            }
        }
    }
);



const auditorium_type = sequelize.define(
    'auditorium_type',
    {
        auditorium_type: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
        auditorium_typename: { type: Sequelize.STRING, allowNull: false }
    },
    {
        sequelize,
        tableName: 'auditorium_type'
    }
);
auditorium_type.hasMany(auditorium, {
    foreignKey: 'auditorium_type',
    sourceKey: 'auditorium_type'
})



export {
    faculty,
    pulpit,
    subject,
    teacher,
    auditorium_type,
    auditorium
};