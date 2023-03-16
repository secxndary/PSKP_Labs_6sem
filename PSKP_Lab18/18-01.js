import { Sequelize } from 'sequelize';
import express from 'express';
import {
    faculty,
    pulpit,
    subject,
    teacher,
    auditorium_type,
    auditorium
} from './models/models.js';


const app = express();
const prefix = '/api';
const __dirname = 'C:\\Users\\valda\\source\\repos\\semester#6\\ПСКП\\PSKP_Lab18\\static\\';
const sequelize = new Sequelize('sequel', 'postgres', '1111', {
    host: 'localhost',
    dialect: 'postgres',
    define: { timestamps: false }
});




app.get(prefix + '/user', (req, res) => {
    res.sendFile(__dirname + 'index.html');
})
    .get(prefix + '/faculties', (req, res) => {
        faculty.findAll().then(items => { res.send(JSON.stringify(items, null, 4)); });
    })
    .get(prefix + '/pulpits', (req, res) => {
        pulpit.findAll().then(items => { res.send(JSON.stringify(items, null, 4)); });
    })
    .get(prefix + '/subjects', (req, res) => {
        subject.findAll().then(items => { res.send(JSON.stringify(items, null, 4)); });
    })
    .get(prefix + '/auditoriumstypes', (req, res) => {
        auditorium_type.findAll().then(items => { res.send(JSON.stringify(items, null, 4)); });
    })
    .get(prefix + '/auditoriums', (req, res) => {
        auditorium.findAll().then(items => { res.send(JSON.stringify(items, null, 4)); });
    })





sequelize.authenticate()
    .then(() => {
        console.log('[OK] Connected to database.\n');
        // faculty.findAll().then(items => { console.log(JSON.stringify(items, null, 4)); });
        // pulpit.findAll().then(items => { console.log(JSON.stringify(items, null, 4)); });
        // teacher.findAll().then(items => { console.log(JSON.stringify(items, null, 4)); });
        // subject.findAll().then(items => { console.log(JSON.stringify(items, null, 4)); });
        // auditorium_type.findAll().then(items => { console.log(JSON.stringify(items, null, 4)); });
        // auditorium.findAll().then(items => { console.log(JSON.stringify(items, null, 4)); });
        // sequelize.close();
    })
    .catch(err => { console.log('[ERROR] Sequelize: ', err); });



app.listen(5000);