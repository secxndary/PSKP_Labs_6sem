const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const uuidv4 = require('uuid').v4;


module.exports = class AuthorController {

    getAuthors = async (req, res) => {
        const authors = await prisma.author.findMany();
        res.render('author.hbs', { layout: false, data: JSON.stringify(authors, null, 4) });
    }


    getAuthor = async (res, id) => {
        const author = await prisma.author.findUnique({ where: { id } });
        res.render('author.hbs', { layout: false, data: JSON.stringify(author, null, 4) });
    }


    createAuthor = async (res, req) => {
        const dto = req.body;
        
        try {
            console.log({ dto, });
            const author = await prisma.author.create({
                data: {
                    id: '15bf73e4-9c11-4b69-bcba-f735657bbbba',
                    name: dto.name,
                    surname: dto.surname,
                    country: dto.country,
                    date_of_birth: dto.date_of_birth
                },
                select: {
                    id: true,
                    surname: true
                }
            })

            console.log('poxyi')
            // res.render('author.hbs', { layout: false, data: JSON.stringify(author, null, 4) });
            // res.redirect(`/author/${author.id}`);
        }
        catch { err => console.log(err) }
    }


    updateAuthor = async (res, dto) => {

    }


    deleteAuthor = async (res, id) => {

    }
}