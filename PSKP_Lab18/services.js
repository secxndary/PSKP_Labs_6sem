import { faculty, pulpit, subject, teacher, auditorium_type, auditorium } from './models/models.js';



export default class SequelizeService {

    // ==================================  SELECT  ================================

    getFaculties = async res => { res.json(await faculty.findAll()); }

    getPulpits = async res => { res.json(await pulpit.findAll()); }

    getSubjects = async res => { res.json(await subject.findAll()); }

    getTeachers = async res => { res.json(await teacher.findAll()); }

    getAuditoriumTypes = async res => { res.json(await auditorium_type.findAll()); }

    getAuditoriums = async res => { res.json(await auditorium.findAll()); }




    // =================================  INSERT  =================================

    insertFaculty = async (res, dto) => {
        try { res.json(await faculty.create(dto)); }
        catch (err) { this.sendError(res, err); }
    }

    insertPulpit = async (res, dto) => {
        try { res.json(await pulpit.create(dto)); }
        catch (err) { this.sendError(res, err); }
    }

    insertSubject = async (res, dto) => {
        try { res.json(await subject.create(dto)); }
        catch (err) { this.sendError(res, err); }
    }

    insertTeacher = async (res, dto) => {
        try { res.json(await teacher.create(dto)); }
        catch (err) { this.sendError(res, err); }
    }

    insertAuditoriumType = async (res, dto) => {
        try { res.json(await auditorium_type.create(dto)); }
        catch (err) { this.sendError(res, err); }
    }

    insertAuditorium = async (res, dto) => {
        try { res.json(await auditorium.create(dto)); }
        catch (err) { this.sendError(res, err); }
    }




    // =================================  UPDATE  =================================

    updateFaculty = async (res, dto) => {
        try {
            const facultyToUpdate = await faculty.findByPk(dto.faculty);
            if (!facultyToUpdate)
                this.sendCustomError(res, 404, `Cannot find faculty = ${dto.faculty}`);
            else {
                faculty.update(dto, { where: { faculty: dto.faculty } })
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
            if (!pulpitToUpdate)
                this.sendCustomError(res, 404, `Cannot find pulpit = ${dto.pulpit}`);
            else {
                pulpit.update(dto, { where: { pulpit: dto.pulpit } })
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
            if (!subjectToUpdate)
                this.sendCustomError(res, 404, `Cannot find subject = ${dto.subject}`);
            else {
                subject.update(dto, { where: { subject: dto.subject } })
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
            if (!teacherToUpdate)
                this.sendCustomError(res, 404, `Cannot find teacher = ${dto.teacher}`);
            else {
                teacher.update(dto, { where: { teacher: dto.teacher } })
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
                this.sendCustomError(res, 404, `Cannot find  = ${dto.auditorium_type}`);
            else {
                auditorium_type.update(dto, { where: { auditorium_type: dto.auditorium_type } })
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
            if (!auditoriumToUpdate)
                this.sendCustomError(res, 404, `Cannot find auditorium = ${dto.auditorium}`);
            else {
                auditorium.update(dto, { where: { auditorium: dto.auditorium } })
                    .then(async () => {
                        res.json(await auditorium.findByPk(dto.auditorium));
                    });
            }
        }
        catch (err) { this.sendError(res, err); }
    }




    // =================================  DELETE  =================================

    deleteFaculty = async (res, faculty_id) => {
        const facultyToDelete = await faculty.findByPk(faculty_id);
        await faculty.destroy({ where: { faculty: faculty_id } })
            .then(() => {
                if (!facultyToDelete)
                    this.sendCustomError(res, 404, `Cannot find faculty = ${faculty_id}`);
                else
                    res.json(facultyToDelete);
            });
    }

    deletePulpit = async (res, pulpit_id) => {
        const pulpitToDelete = await pulpit.findByPk(pulpit_id);
        await pulpit.destroy({ where: { pulpit: pulpit_id } })
            .then(() => {
                if (!pulpitToDelete)
                    this.sendCustomError(res, 404, `Cannot find pulpit = ${pulpit_id}`);
                else
                    res.json(pulpitToDelete);
            });
    }

    deleteSubject = async (res, subject_id) => {
        const subjectToDelete = await subject.findByPk(subject_id);
        await subject.destroy({ where: { subject: subject_id } })
            .then(() => {
                if (!subjectToDelete)
                    this.sendCustomError(res, 404, `Cannot find subject = ${subject_id}`);
                else
                    res.json(subjectToDelete);
            });
    }

    deleteAuditoriumType = async (res, type_id) => {
        const typeToDelete = await auditorium_type.findByPk(type_id);
        await auditorium_type.destroy({ where: { auditorium_type: type_id } })
            .then(() => {
                if (!typeToDelete)
                    this.sendCustomError(res, 404, `Cannot find auditorium_type = ${type_id}`);
                else
                    res.json(typeToDelete);
            });
    }

    deleteAuditorium = async (res, auditorium_id) => {
        const auditoriumToDelete = await auditorium.findByPk(auditorium_id);
        await auditorium.destroy({ where: { auditorium: auditorium_id } })
            .then(() => {
                if (!auditoriumToDelete)
                    this.sendCustomError(res, 404, `Cannot find auditorium = ${auditorium_id}`);
                else
                    res.json(auditoriumToDelete);
            });
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