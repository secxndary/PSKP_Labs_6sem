import express from 'express';

// const __dirname = 'C:\\Users\\valda\\source\\repos\\semester#6\\ПСКП\\PSKP_Lab20\\views\\';
// const prefix = '/api';
const port = process.env.PORT ? process.env.PORT : 3000;
const app = express();


app.listen(port, () => console.log(`[OK] Server running at localhost:${port}/\n`));
