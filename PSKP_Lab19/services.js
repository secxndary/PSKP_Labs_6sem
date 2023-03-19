import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



export default class PrismaService {

    // ===========================================  SELECT  =========================================

    getFaculties = async res => res.json(await prisma.faculty.findMany());

    getPulpits = async res => res.json(await prisma.pulpit.findMany());

    getSubjects = async res => res.json(await prisma.subject.findMany());

    getTeachers = async res => res.json(await prisma.teacher.findMany());

    getAuditoriumTypes = async res => res.json(await prisma.auditoriumType.findMany());

    getAuditoriums = async res => res.json(await prisma.auditorium.findMany());


    getFacultySubjects = async (res, xyz) => {
        try {
            const facultyToFind = await prisma.faculty.findUnique({ where: { faculty: xyz } });
            if (!facultyToFind)
                this.sendCustomError(res, 404, `Cannot find faculty = ${xyz}`);
            else {
                res.json(await prisma.faculty.findMany({
                    where: { faculty: xyz },
                    select: {
                        faculty: true,
                        Pulpit: {
                            select: {
                                pulpit: true,
                                Subject: { select: { subject_name: true } }
                            }
                        }
                    }
                }));
            }
        }
        catch (err) { this.sendError(res, err); }
    }


    getTypesAuditoriums = async (res, xyz) => {
        try {
            const typeToFind = await prisma.auditoriumType.findUnique({ where: { auditorium_type: xyz } });
            if (!typeToFind)
                this.sendCustomError(res, 404, `Cannot find auditorium_type = ${xyz}`);
            else {
                res.json(await prisma.auditoriumType.findMany({
                    where: { auditorium_type: xyz },
                    select: {
                        auditorium_type: true,
                        Auditorium: { select: { auditorium: true } }
                    }
                }));
            }
        }
        catch (err) { this.sendError(res, err); }
    }


    getComputerAuditoriums1k = async res => {
        try {
            res.json(await prisma.auditorium.findMany({
                where: {
                    auditorium_type: 'ЛБ-К',
                    auditorium: { endsWith: '-1' }
                },
            }));
        }
        catch (err) { this.sendError(res, err); }
    }


    getPuplitsWithoutTeachers = async res => {
        try {
            const pulpitsWithoutTeachers = await prisma.pulpit.findMany({
                where: {
                    Teacher: { none: {} }
                }
            });
            if (pulpitsWithoutTeachers.length === 0)
                this.sendCustomError(res, 404, 'There is no pulpits without teachers');
            else
                res.json(pulpitsWithoutTeachers);
        }
        catch (err) { this.sendError(res, err); }
    }


    getPulpitsWithVladimir = async res => {
        try {
            const pulpitsWithVladimir = await prisma.pulpit.findMany({
                where: {
                    Teacher: {
                        some: {
                            teacher_name: { contains: 'Владимир' }
                        }
                    }
                },
                select: {
                    pulpit: true,
                    pulpit_name: true,
                    Teacher: {
                        select: {
                            teacher_name: true
                        }
                    }
                }
            });
            if (pulpitsWithVladimir.length === 0)
                this.sendCustomError(res, 404, 'There is no pulpits with teachers named "Vladimir"');
            else
                res.json(pulpitsWithVladimir);
        }
        catch (err) { this.sendError(res, err); }
    }


    getAuditoriumsWithSameTypeAndCapacity = async res => {
        try {
            const sameAuditoriums = await prisma.auditorium.groupBy({
                by: ['auditorium_capacity', 'auditorium_type'],
                _count: { auditorium: true },
                having: {
                    auditorium: {
                        _count: { gt: 1 }
                    }
                }
            });
            if (sameAuditoriums.length === 0)
                this.sendCustomError(res, 404, 'There is no auditoriums with same type and capacity');
            else
                res.json(sameAuditoriums);
        }
        catch (err) { this.sendError(res, err); }
    }




    // ==========================================  INSERT  ==========================================

    insertFaculty = async (res, dto) => {
        try {
            const facultyExists = await prisma.faculty.findFirst({ where: { faculty: dto.faculty } });

            if (facultyExists)
                this.sendCustomError(res, 409, `There is already faculty = ${dto.faculty}`);
            else
                res.status(201).json(await prisma.faculty.create({
                    data: {
                        faculty: dto.faculty,
                        faculty_name: dto.faculty_name
                    }
                }));
        }
        catch (err) { this.sendError(res, err); }
    }


    insertPulpit = async (res, dto) => {
        try {
            const pulpitExists = await prisma.pulpit.findFirst({ where: { pulpit: dto.pulpit } });
            const facultyExists = await prisma.faculty.findFirst({ where: { faculty: dto.faculty } });

            if (pulpitExists)
                this.sendCustomError(res, 409, `There is already pulpit = ${dto.pulpit}`);
            else if (!facultyExists)
                this.sendCustomError(res, 404, `Cannot find faculty = ${dto.faculty}`);
            else
                res.status(201).json(await prisma.pulpit.create({
                    data: {
                        pulpit: dto.pulpit,
                        pulpit_name: dto.pulpit_name,
                        faculty: dto.faculty
                    }
                }));
        }
        catch (err) { this.sendError(res, err); }
    }


    insertSubject = async (res, dto) => {
        try {
            const subjectExists = await prisma.subject.findFirst({ where: { subject: dto.subject } });
            const pulpitExists = await prisma.pulpit.findFirst({ where: { pulpit: dto.pulpit } });

            if (subjectExists)
                this.sendCustomError(res, 409, `There is already subject = ${dto.subject}`);
            else if (!pulpitExists)
                this.sendCustomError(res, 404, `Cannot find pulpit = ${dto.pulpit}`);
            else
                res.status(201).json(await prisma.subject.create({
                    data: {
                        subject: dto.subject,
                        subject_name: dto.subject_name,
                        pulpit: dto.pulpit
                    }
                }));
        }
        catch (err) { console.log(err); this.sendError(res, err); }
    }


    insertTeacher = async (res, dto) => {
        try {
            const teacherExists = await prisma.teacher.findFirst({ where: { teacher: dto.teacher } });
            const pulpitExists = await prisma.pulpit.findFirst({ where: { pulpit: dto.pulpit } });

            if (teacherExists)
                this.sendCustomError(res, 409, `There is already teacher = ${dto.teacher}`);
            else if (!pulpitExists)
                this.sendCustomError(res, 404, `Cannot find pulpit = ${dto.pulpit}`);
            else
                res.status(201).json(await prisma.teacher.create({
                    data: {
                        teacher: dto.teacher,
                        teacher_name: dto.teacher_name,
                        pulpit: dto.pulpit
                    }
                }));
        }
        catch (err) { this.sendError(res, err); }
    }


    insertAuditoriumType = async (res, dto) => {
        try {
            const typeExists = await prisma.auditoriumType.findFirst({ where: { auditorium_type: dto.auditorium_type } });

            if (typeExists)
                this.sendCustomError(res, 409, `There is already auditorium_type = ${dto.auditorium_type}`);
            else
                res.status(201).json(await prisma.auditoriumType.create({
                    data: {
                        auditorium_type: dto.auditorium_type,
                        auditorium_typename: dto.auditorium_typename
                    }
                }));
        }
        catch (err) { this.sendError(res, err); }
    }


    insertAuditorium = async (res, dto) => {
        try {
            const auditoriumExists = await prisma.auditorium.findFirst({ where: { auditorium: dto.auditorium } });
            const typeExists = await prisma.auditoriumType.findFirst({ where: { auditorium_type: dto.auditorium_type } });

            if (auditoriumExists)
                this.sendCustomError(res, 409, `There is already auditorium = ${dto.auditorium}`);
            else if (!typeExists)
                this.sendCustomError(res, 404, `Cannot find auditorium_type = ${dto.auditorium_type}`);
            else
                res.status(201).json(await prisma.auditorium.create({
                    data: {
                        auditorium: dto.auditorium,
                        auditorium_name: dto.auditorium_name,
                        auditorium_capacity: dto.auditorium_capacity,
                        auditorium_type: dto.auditorium_type
                    }
                }));
        }
        catch (err) { this.sendError(res, err); }
    }




    // ==========================================  UPDATE  ==========================================

    updateFaculty = async (res, dto) => {
        try {
            const facultyToUpdate = await prisma.faculty.findUnique({ where: { faculty: dto.faculty } });
            if (!facultyToUpdate)
                this.sendCustomError(res, 404, `Cannot find faculty = ${dto.faculty}`);
            else {
                await prisma.faculty.update({
                    where: { faculty: dto.faculty },
                    data: { faculty_name: dto.faculty_name }
                }).then(async () => res.json(await prisma.faculty.findUnique({ where: { faculty: dto.faculty } })));
            }
        }
        catch (err) { this.sendError(res, err); }
    }


    updatePulpit = async (res, dto) => {
        try {
            const pulpitToUpdate = await prisma.pulpit.findUnique({ where: { pulpit: dto.pulpit } });
            const facultyToUpdate = await prisma.faculty.findUnique({ where: { faculty: dto.faculty } });

            if (!pulpitToUpdate)
                this.sendCustomError(res, 404, `Cannot find pulpit = ${dto.pulpit}`);
            else if (!facultyToUpdate)
                this.sendCustomError(res, 404, `Cannot find faculty = ${dto.faculty}`);
            else {
                await prisma.pulpit.update({
                    where: { pulpit: dto.pulpit },
                    data: {
                        pulpit_name: dto.pulpit_name,
                        faculty: dto.faculty
                    }
                }).then(async () => res.json(await prisma.pulpit.findUnique({ where: { pulpit: dto.pulpit } })));
            }
        }
        catch (err) { this.sendError(res, err); }
    }


    updateSubject = async (res, dto) => {
        try {
            const subjectToUpdate = await prisma.subject.findUnique({ where: { subject: dto.subject } });
            const pulpitToUpdate = await prisma.pulpit.findUnique({ where: { pulpit: dto.pulpit } });

            if (!subjectToUpdate)
                this.sendCustomError(res, 404, `Cannot find subject = ${dto.subject}`);
            else if (!pulpitToUpdate)
                this.sendCustomError(res, 404, `Cannot find pulpit = ${dto.pulpit}`);
            else {
                await prisma.subject.update({
                    where: { subject: dto.subject },
                    data: {
                        subject_name: dto.subject_name,
                        pulpit: dto.pulpit
                    }
                }).then(async () => res.json(await prisma.subject.findUnique({ where: { subject: dto.subject } })));
            }
        }
        catch (err) { this.sendError(res, err); }
    }


    updateTeacher = async (res, dto) => {
        try {
            const teacherToUpdate = await prisma.teacher.findUnique({ where: { teacher: dto.teacher } });
            const pulpitToUpdate = await prisma.pulpit.findUnique({ where: { pulpit: dto.pulpit } });

            if (!teacherToUpdate)
                this.sendCustomError(res, 404, `Cannot find teacher = ${dto.teacher}`);
            else if (!pulpitToUpdate)
                this.sendCustomError(res, 404, `Cannot find pulpit = ${dto.pulpit}`);
            else {
                await prisma.teacher.update({
                    where: { teacher: dto.teacher },
                    data: {
                        teacher_name: dto.teacher_name,
                        pulpit: dto.pulpit
                    }
                }).then(async () => res.json(await prisma.teacher.findUnique({ where: { teacher: dto.teacher } })));
            }
        }
        catch (err) { this.sendError(res, err); }
    }


    updateAuditoriumType = async (res, dto) => {
        try {
            const typeToUpdate = await prisma.auditoriumType.findUnique({ where: { auditorium_type: dto.auditorium_type } });
            if (!typeToUpdate)
                this.sendCustomError(res, 404, `Cannot find auditorium_type = ${dto.auditorium_type}`);
            else {
                await prisma.auditoriumType.update({
                    where: { auditorium_type: dto.auditorium_type },
                    data: { auditorium_typename: dto.auditorium_typename }
                }).then(async () => res.json(await prisma.auditoriumType.findUnique({ where: { auditorium_type: dto.auditorium_type } })));
            }
        }
        catch (err) { this.sendError(res, err); }
    }


    updateAuditorium = async (res, dto) => {
        try {
            const auditoriumToUpdate = await prisma.auditorium.findUnique({ where: { auditorium: dto.auditorium } });
            const typeToUpdate = await prisma.auditoriumType.findUnique({ where: { auditorium_type: dto.auditorium_type } });

            if (!auditoriumToUpdate)
                this.sendCustomError(res, 404, `Cannot find auditorium = ${dto.auditorium}`);
            else if (!typeToUpdate)
                this.sendCustomError(res, 404, `Cannot find auditorium_type = ${dto.auditorium_type}`);
            else {
                await prisma.auditorium.update({
                    where: { auditorium: dto.auditorium },
                    data: {
                        auditorium_name: dto.auditorium_name,
                        auditorium_capacity: dto.auditorium_capacity,
                        auditorium_type: dto.auditorium_type
                    }
                }).then(async () => res.json(await prisma.auditorium.findUnique({ where: { auditorium: dto.auditorium } })));
            }
        }
        catch (err) { this.sendError(res, err); }
    }




    // ==========================================  DELETE  ==========================================

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




    // ========================================  TRANSACTION  =======================================

    transaction = async res => {
        const trans = await sequelize.transaction({ isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED });
        await auditorium.update(
            { auditorium_capacity: 0 },
            { where: {} },
            { transaction: trans }
        );
        console.log('----- Waiting 10 seconds...');

        setTimeout(async () => {
            await trans.rollback();
            console.log('----- Values rolled back.');
        }, 10000);

        res.json({ "message": "Check out console logging" });
    }




    // ========================================  ERROR UTILS  =======================================

    sendError = async (res, err) => {
        if (err)
            res.status(409).json({
                name: err?.name,
                code: err.code,
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