import express from 'express';
import PrismaService from './services.js';

const __dirname = 'C:\\Users\\valda\\source\\repos\\semester#6\\ПСКП\\PSKP_Lab19\\static\\';
const prefix = '/api';
const service = new PrismaService;
const app = express();



app.use(express.json());
app.use(express.static('static'))
app.get('/', (req, res) => { res.sendFile(__dirname + 'index.html'); });

app.get(prefix + '/faculties', (req, res) => service.getFaculties(res))
    .get(prefix + '/pulpits', (req, res) => service.getPulpits(res))
    .get(prefix + '/teachers', (req, res) => service.getTeachers(res))
    .get(prefix + '/subjects', (req, res) => service.getSubjects(res))
    .get(prefix + '/auditoriumstypes', (req, res) => service.getAuditoriumTypes(res))
    .get(prefix + '/auditoriums', (req, res) => service.getAuditoriums(res))
    .get(prefix + '/faculties/:xyz/subjects', (req, res) => service.getFacultySubjects(res, req.params['xyz']))
    .get(prefix + '/auditoriumtypes/:xyz/auditoriums', (req, res) => service.getTypesAuditoriums(res, req.params['xyz']))
    .get(prefix + '/auditoriumsWithComp1', (req, res) => service.getComputerAuditoriums1k(res))
    .get(prefix + '/puplitsWithoutTeachers', (req, res) => service.getPuplitsWithoutTeachers(res))
    .get(prefix + '/pulpitsWithVladimir', (req, res) => service.getPulpitsWithVladimir(res))
    .get(prefix + '/auditoriumsSameCount', (req, res) => service.getAuditoriumsWithSameTypeAndCapacity(res))
    .get(prefix + '/transaction', (req, res) => service.transaction(res));

app.post(prefix + '/faculties', (req, res) => service.insertFaculty(res, req.body))
    .post(prefix + '/pulpits', (req, res) => service.insertPulpit(res, req.body))
    .post(prefix + '/teachers', (req, res) => service.insertTeacher(res, req.body))
    .post(prefix + '/subjects', (req, res) => service.insertSubject(res, req.body))
    .post(prefix + '/auditoriumstypes', (req, res) => service.insertAuditoriumType(res, req.body))
    .post(prefix + '/auditoriums', (req, res) => service.insertAuditorium(res, req.body));

app.put(prefix + '/faculties', (req, res) => service.updateFaculty(res, req.body))
    .put(prefix + '/pulpits', (req, res) => service.updatePulpit(res, req.body))
    .put(prefix + '/teachers', (req, res) => service.updateTeacher(res, req.body))
    .put(prefix + '/subjects', (req, res) => service.updateSubject(res, req.body))
    .put(prefix + '/auditoriumstypes', (req, res) => service.updateAuditoriumType(res, req.body))
    .put(prefix + '/auditoriums', (req, res) => service.updateAuditorium(res, req.body));

app.delete(prefix + '/faculties/:faculty', (req, res) => service.deleteFaculty(res, req.params['faculty']))
    .delete(prefix + '/pulpits/:pulpit', (req, res) => service.deletePulpit(res, req.params['pulpit']))
    .delete(prefix + '/subjects/:subject', (req, res) => service.deleteSubject(res, req.params['subject']))
    .delete(prefix + '/auditoriumtypes/:type', (req, res) => service.deleteAuditoriumType(res, req.params['type']))
    .delete(prefix + '/auditoriums/:auditorium', (req, res) => service.deleteAuditorium(res, req.params['auditorium']));



app.listen(process.env.PORT, () => console.log(`[OK] Server running at localhost:${process.env.PORT}/\n`));