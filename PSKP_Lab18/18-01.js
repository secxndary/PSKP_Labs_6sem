import { Sequelize } from 'sequelize';
import {
    faculty,
    pulpit,
    subject,
    teacher,
    auditorium_type,
    auditorium
} from './models/models.js';
const sequelize = new Sequelize('sequel', 'postgres', '1111', {
    host: 'localhost',
    dialect: 'postgres',
    define: { timestamps: false }
});



sequelize.authenticate()
    .then(() => {
        console.log('[OK] Connected to database.\n');

        faculty.findAll().then(items => { console.log(JSON.stringify(items, null, 4)); });
        pulpit.findAll().then(items => { console.log(JSON.stringify(items, null, 4)); });
        teacher.findAll().then(items => { console.log(JSON.stringify(items, null, 4)); });
        subject.findAll().then(items => { console.log(JSON.stringify(items, null, 4)); });
        auditorium_type.findAll().then(items => { console.log(JSON.stringify(items, null, 4)); });
        auditorium.findAll().then(items => { console.log(JSON.stringify(items, null, 4)); });


        // sequelize.close();
    })
    .catch(err => {
        console.log('[ERROR] Sequelize: ', err);
    })






// let http_handler = (req, res) => {
// }
// server.listen(5000, () => { console.log('\n[INFO] Server running at localhost:5000/\n'); })
//     .on('error', error => { console.log('\n[ERROR] ', error.message); })
//     .on('request', http_handler);

