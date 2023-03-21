import { Sequelize, Transaction } from 'sequelize';
import { faculty, pulpit, subject, teacher, auditorium_type, auditorium } from './models/models.js';
const sequelize = new Sequelize('sequel', 'postgres', '1111', {
    host: 'localhost',
    dialect: 'postgres',
    define: { timestamps: false },
    pool: {
        max: 5,
        min: 1,
        acquire: 30000
    }
});



export default class SequelizeService {

    // ==================================  SELECT  ================================

    getFaculties = async res => { res.json(await faculty.findAll()); }

    getPulpits = async res => { res.json(await pulpit.findAll()); }

    getSubjects = async res => { res.json(await subject.findAll()); }

    getTeachers = async res => { res.json(await teacher.findAll()); }

    getAuditoriumTypes = async res => { res.json(await auditorium_type.findAll()); }

    getAuditoriums = async res => { res.json(await auditorium.findAll()); }

    getFacultyPulpits = async (res, xyz) => {
        try {
            const facultyToFind = await faculty.findByPk(xyz);
            const pulpits = await pulpit.findAll({ where: { faculty: xyz } });
            if (!facultyToFind)
                this.sendCustomError(res, 404, `Cannot find faculty = ${xyz}`);
            else if (!pulpits)
                this.sendCustomError(res, 404, `Cannot find pulpits with faculty = ${xyz}`);
            else {
                res.json(await faculty.findAll({
                    where: { faculty: xyz },
                    include: {
                        model: pulpit,
                        attributes: ['pulpit', 'pulpit_name']
                    },
                }));
            }
        }
        catch (err) { this.sendError(res, err); }
    }

    getFacultyTeachers = async (res, xyz) => {
        try {
            const facultyToFind = await faculty.findByPk(xyz);
            if (!facultyToFind)
                this.sendCustomError(res, 404, `Cannot find faculty = ${xyz}`);
            else {
                res.json(await faculty.findAll({
                    where: { faculty: xyz },
                    include: {
                        model: pulpit,
                        attributes: ['pulpit', 'pulpit_name'],
                        include: {
                            model: teacher,
                            attributes: ['teacher', 'teacher_name'],
                        }
                    }
                }));
            }
        }
        catch (err) { this.sendError(res, err); }
    }

    getAuditoriumsGt60 = async res => {
        const auditoriumsGt60 = await auditorium.scope('greaterThan60').findAll();
        if (!auditoriumsGt60.length == 0)
            this.sendCustomError(res, 404, 'Cannot find auditoriums with capacity > 60');
        else
            res.json(auditoriumsGt60);
    }

    getAuditoriumsbetween10And60 = async res => {
        const auditoriumsbetween10And60 = await auditorium.scope('between10And60').findAll();
        if (auditoriumsbetween10And60.length == 0)
            this.sendCustomError(res, 404, 'Cannot find auditoriums with capacity between 10 and 60');
        else
            res.json(auditoriumsbetween10And60);
    }




    // =================================  INSERT  =================================

    insertFaculty = async (res, dto) => {
        try { res.status(201).json(await faculty.create(dto)); }
        catch (err) { this.sendError(res, err); }
    }

    insertPulpit = async (res, dto) => {
        try { res.status(201).json(await pulpit.create(dto)); }
        catch (err) { this.sendError(res, err); }
    }

    insertSubject = async (res, dto) => {
        try { res.status(201).json(await subject.create(dto)); }
        catch (err) { this.sendError(res, err); }
    }

    insertTeacher = async (res, dto) => {
        try { res.status(201).json(await teacher.create(dto)); }
        catch (err) { this.sendError(res, err); }
    }

    insertAuditoriumType = async (res, dto) => {
        try { res.status(201).json(await auditorium_type.create(dto)); }
        catch (err) { this.sendError(res, err); }
    }

    insertAuditorium = async (res, dto) => {
        try { res.status(201).json(await auditorium.create(dto)); }
        catch (err) { this.sendError(res, err); }
    }




    // =================================  UPDATE  =================================

    updateFaculty = async (res, dto) => {
        try {
            const facultyToUpdate = await faculty.findByPk(dto.faculty);
            if (!facultyToUpdate)
                this.sendCustomError(res, 404, `Cannot find faculty = ${dto.faculty}`);
            else {
                await faculty.update(dto, { where: { faculty: dto.faculty } })
                    .then(async () => {
                        res.json(await faculty.findByPk(dto.faculty));
                    });
            }
        }
        catch (err) { this.sendError(res, err); }
    }

    updatePulpit = async (res, dto) => {
        try {
            const pulpitToUpdate = await pulpit.findByPk(dto.pulpit);
            const facultyToUpdate = await faculty.findByPk(dto.faculty);
            if (!pulpitToUpdate)
                this.sendCustomError(res, 404, `Cannot find pulpit = ${dto.pulpit}`);
            else if (!facultyToUpdate)
                this.sendCustomError(res, 404, `Cannot find faculty = ${dto.faculty}`);
            else {
                await pulpit.update(dto, { where: { pulpit: dto.pulpit } })
                    .then(async () => {
                        res.json(await pulpit.findByPk(dto.pulpit));
                    });
            }
        }
        catch (err) { this.sendError(res, err); }
    }

    updateSubject = async (res, dto) => {
        try {
            const subjectToUpdate = await subject.findByPk(dto.subject);
            const pulpitToUpdate = await pulpit.findByPk(dto.pulpit);
            if (!subjectToUpdate)
                this.sendCustomError(res, 404, `Cannot find subject = ${dto.subject}`);
            else if (!pulpitToUpdate)
                this.sendCustomError(res, 404, `Cannot find pulpit = ${dto.pulpit}`);
            else {
                await subject.update(dto, { where: { subject: dto.subject } })
                    .then(async () => {
                        res.json(await subject.findByPk(dto.subject));
                    });
            }
        }
        catch (err) { this.sendError(res, err); }
    }

    updateTeacher = async (res, dto) => {
        try {
            const teacherToUpdate = await teacher.findByPk(dto.teacher);
            const pulpitToUpdate = await pulpit.findByPk(dto.pulpit);
            if (!teacherToUpdate)
                this.sendCustomError(res, 404, `Cannot find teacher = ${dto.teacher}`);
            else if (!pulpitToUpdate)
                this.sendCustomError(res, 404, `Cannot find pulpit = ${dto.pulpit}`);
            else {
                await teacher.update(dto, { where: { teacher: dto.teacher } })
                    .then(async () => {
                        res.json(await teacher.findByPk(dto.teacher));
                    });
            }
        }
        catch (err) { this.sendError(res, err); }
    }

    updateAuditoriumType = async (res, dto) => {
        try {
            const typeToUpdate = await auditorium_type.findByPk(dto.auditorium_type);
            if (!typeToUpdate)
                this.sendCustomError(res, 404, `Cannot find auditorium_type = ${dto.auditorium_type}`);
            else {
                await auditorium_type.update(dto, { where: { auditorium_type: dto.auditorium_type } })
                    .then(async () => {
                        res.json(await auditorium_type.findByPk(dto.auditorium_type));
                    });
            }
        }
        catch (err) { this.sendError(res, err); }
    }

    updateAuditorium = async (res, dto) => {
        try {
            const auditoriumToUpdate = await auditorium.findByPk(dto.auditorium);
            const typeToUpdate = await auditorium_type.findByPk(dto.auditorium_type);
            if (!auditoriumToUpdate)
                this.sendCustomError(res, 404, `Cannot find auditorium = ${dto.auditorium}`);
            else if (!typeToUpdate)
                this.sendCustomError(res, 404, `Cannot find auditorium_type = ${dto.auditorium_type}`);
            else {
                await auditorium.update(dto, { where: { auditorium: dto.auditorium } })
                    .then(async () => {
                        res.json(await auditorium.findByPk(dto.auditorium));
                    });
            }
        }
        catch (err) { this.sendError(res, err); }
    }




    // =================================  DELETE  =================================

    deleteFaculty = async (res, faculty_id) => {
        try {
            const facultyToDelete = await faculty.findByPk(faculty_id);
            await faculty.destroy({ where: { faculty: faculty_id } })
                .then(() => {
                    if (!facultyToDelete)
                        this.sendCustomError(res, 404, `Cannot find faculty = ${faculty_id}`);
                    else
                        res.json(facultyToDelete);
                });
        }
        catch (err) { this.sendError(res, err); }
    }

    deletePulpit = async (res, pulpit_id) => {
        try {
            const pulpitToDelete = await pulpit.findByPk(pulpit_id);
            await pulpit.destroy({ where: { pulpit: pulpit_id } })
                .then(() => {
                    if (!pulpitToDelete)
                        this.sendCustomError(res, 404, `Cannot find pulpit = ${pulpit_id}`);
                    else
                        res.json(pulpitToDelete);
                });
        }
        catch (err) { this.sendError(res, err); }
    }

    deleteSubject = async (res, subject_id) => {
        try {
            const subjectToDelete = await subject.findByPk(subject_id);
            await subject.destroy({ where: { subject: subject_id } })
                .then(() => {
                    if (!subjectToDelete)
                        this.sendCustomError(res, 404, `Cannot find subject = ${subject_id}`);
                    else
                        res.json(subjectToDelete);
                });
        }
        catch (err) { this.sendError(res, err); }
    }

    deleteAuditoriumType = async (res, type_id) => {
        try {
            const typeToDelete = await auditorium_type.findByPk(type_id);
            await auditorium_type.destroy({ where: { auditorium_type: type_id } })
                .then(() => {
                    if (!typeToDelete)
                        this.sendCustomError(res, 404, `Cannot find auditorium_type = ${type_id}`);
                    else
                        res.json(typeToDelete);
                });
        }
        catch (err) { this.sendError(res, err); }
    }

    deleteAuditorium = async (res, auditorium_id) => {
        try {
            const auditoriumToDelete = await auditorium.findByPk(auditorium_id);
            await auditorium.destroy({ where: { auditorium: auditorium_id } })
                .then(() => {
                    if (!auditoriumToDelete)
                        this.sendCustomError(res, 404, `Cannot find auditorium = ${auditorium_id}`);
                    else
                        res.json(auditoriumToDelete);
                });
        }
        catch (err) { this.sendError(res, err); }
    }




    // ===============================  TRANSACTION  ==============================

    transaction = async res => {
        const trans = await sequelize.transaction({ isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED });
        await auditorium.update(
            { auditorium_capacity: 0 },
            {
                where: {},
                transaction: trans
            }
        );
        console.log('----- Waiting 10 seconds...');

        setTimeout(async () => {
            await trans.rollback();
            console.log('----- Values rolled back.');
        }, 10000);

        res.json({ "message": "Check out console logging" });
    }




    // ===============================  ERROR UTILS  ==============================

    sendError = async (res, err) => {
        if (err)
            res.status(409).json({
                code: err.original?.code,
                name: err?.name,
                detail: err.original?.detail,
                message: err.message
            });
        else
            this.sendCustomError(res, 409, err);
    }

    sendCustomError = async (res, code, message) => {
        res.status(code).json({ code: code, errorMessage: message });
    }
}