import { faculty, pulpit, subject, teacher, auditorium_type, auditorium } from './models/models.js';
import { Sequelize } from 'sequelize';
const sequelize = new Sequelize('sequel', 'postgres', '1111', {
    host: 'localhost',
    dialect: 'postgres',
    define: { timestamps: false }
});




export default class SequelizeService {


    // ========================================  GET  ========================================

    getFaculties = async res => {
        await faculty.findAll().then(items => { res.send(JSON.stringify(items, null, 4)); });
    }

    getPulpits = async res => {
        await pulpit.findAll().then(items => { res.send(JSON.stringify(items, null, 4)); });
    }

    getSubjects = async res => {
        await subject.findAll().then(items => { res.send(JSON.stringify(items, null, 4)); });
    }

    getTeachers = async res => {
        await teacher.findAll().then(items => { res.send(JSON.stringify(items, null, 4)); });
    }

    getAuditoriumTypes = async res => {
        await auditorium_type.findAll().then(items => { res.send(JSON.stringify(items, null, 4)); });
    }

    getAuditoriums = async res => {
        await auditorium.findAll().then(items => { res.send(JSON.stringify(items, null, 4)); });
    }




    // =============================  INSERT  ==============================

    insertFaculty = async (res, dto) => {
        try { res.json(await faculty.create(dto)); }
        catch (err) { this.sendJsonError(res, err); }
    }

    insertPulpit = async (res, dto) => {
        try { res.json(await pulpit.create(dto)); }
        catch (err) { this.sendJsonError(res, err); }
    }

    insertSubject = async (res, dto) => {
        try { res.json(await subject.create(dto)); }
        catch (err) { this.sendJsonError(res, err); }
    }

    insertTeacher = async (res, dto) => {
        try { res.json(await teacher.create(dto)); }
        catch (err) { this.sendJsonError(res, err); }
    }

    insertAuditoriumType = async (res, dto) => {
        try { res.json(await auditorium_type.create(dto)); }
        catch (err) { this.sendJsonError(res, err); }
    }

    insertAuditorium = async (res, dto) => {
        try { res.json(await auditorium.create(dto)); }
        catch (err) { this.sendJsonError(res, err); }
    }












    // =====================================  DELETE  =====================================

    deleteFaculty = async (res, faculty_id) => {
        const facultyToDelete = await faculty.findByPk(faculty_id);
        await faculty.destroy({ where: { faculty: faculty_id } })
            .then(() => {
                if (!facultyToDelete)
                    res.send('иди нахуй');  // todo: заменить на сообщение об ошибке
                else
                    res.send(JSON.stringify(facultyToDelete, null, 4));
            });
    }

    deletePulpit = async (res, pulpit_id) => {
        const pulpitToDelete = await pulpit.findByPk(pulpit_id);
        await pulpit.destroy({ where: { pulpit: pulpit_id } })
            .then(() => {
                if (!pulpitToDelete)
                    res.send('иди нахуй');  // todo: заменить на сообщение об ошибке
                else
                    res.send(JSON.stringify(pulpitToDelete, null, 4));
            });
    }

    deleteSubject = async (res, subject_id) => {
        const subjectToDelete = await subject.findByPk(subject_id);
        await subject.destroy({ where: { subject: subject_id } })
            .then(() => {
                if (!subjectToDelete)
                    res.send('иди нахуй');  // todo: заменить на сообщение об ошибке
                else
                    res.send(JSON.stringify(subjectToDelete, null, 4));
            });
    }

    deleteAuditoriumType = async (res, type_id) => {
        const typeToDelete = await auditorium_type.findByPk(type_id);
        await auditorium_type.destroy({ where: { auditorium_type: type_id } })
            .then(() => {
                if (!typeToDelete)
                    res.send('иди нахуй');  // todo: заменить на сообщение об ошибке
                else
                    res.send(JSON.stringify(typeToDelete, null, 4));
            });
    }

    deleteAuditorium = async (res, auditorium_id) => {
        const auditoriumToDelete = await auditorium.findByPk(auditorium_id);
        await auditorium.destroy({ where: { auditorium: auditorium_id } })
            .then(() => {
                if (!auditoriumToDelete)
                    res.send('иди нахуй');  // todo: заменить на сообщение об ошибке
                else
                    res.send(JSON.stringify(auditoriumToDelete, null, 4));
            });
    }




    sendJsonError = async (res, err) => {
        res.json({ code: err.original.code, name: err.name, detail: err.original.detail, message: err.message });
    }
}