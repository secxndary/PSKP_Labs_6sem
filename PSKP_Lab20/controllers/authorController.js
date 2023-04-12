const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const uuidv4 = require('uuid').v4;


module.exports = class AuthorController {

    getAuthors = async (req, res) => {
        try {
            const authors = await prisma.author.findMany();
            res.render('author.hbs', { layout: false, data: JSON.stringify(authors, null, 4) });
        }
        catch (err) { console.log(err); }
    }


    getAuthor = async (res, id) => {
        const author = await prisma.author.findUnique({ where: { id } });
        res.render('author.hbs', { layout: false, data: JSON.stringify(author, null, 4) });
    }


    createAuthor = async (res, dto) => {
        try {
            const author = await prisma.author.create({
                data: {
                    id: dto.id ? dto.id : uuidv4(),
                    name: dto.name,
                    surname: dto.surname,
                    country: dto.country,
                    date_of_birth: new Date(dto.date_of_birth)
                }
            });
            res.redirect(`/author/${author.id}`);
        }
        catch (err) { console.log(err); }
    }


    updateAuthor = async (res, dto) => {
        const { id, name, surname, country, date_of_birth } = dto;
        console.log({ dto });
        try {
            await prisma.author.update({
                where: { id: id },
                data: {
                    name,
                    surname,
                    country,
                    date_of_birth: date_of_birth ? new Date(date_of_birth) : undefined
                }
            }).then(async () => {
                const authorUpdated = await prisma.author.findUnique({ where: { id: dto.id } });
                console.log({ authorUpdated });
                res.render('author.hbs', { layout: false, data: JSON.stringify(authorUpdated, null, 4) });
                // return res.redirect(`/author/${authorUpdated.id}`);
            })
            // console.log({ author });
            // console.log(res);
            // res.render('author.hbs', { layout: false, data: JSON.stringify(author, null, 4) });
            // res.end();
            // res.redirect(`/author/${author.id}`);
        }
        catch (err) { console.log(err); }
    }


    deleteAuthor = async (res, id) => {
        try {
            const author = await prisma.author.findUnique({ where: { id } });
            if (!author) {
                res.render('author.hbs', { layout: false, data: `Cannot find author with ID = ${id}` });
                return;
            }
            await prisma.author.delete({ where: { id } });
            res.render('author.hbs', { layout: false, data: JSON.stringify(author, null, 4) });
        }
        catch (err) { console.log(err); }
    }
}