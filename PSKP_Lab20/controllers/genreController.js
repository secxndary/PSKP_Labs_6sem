const { PrismaClient } = require('@prisma/client');
const ErrorController = require('./_errorController.js');
const prisma = new PrismaClient();
const uuidv4 = require('uuid').v4;
const error = new ErrorController();


module.exports = class AuthorController {

    getAuthors = async (req, res) => {
        const authors = await prisma.author.findMany();
        res.render('author.hbs', { layout: false, data: JSON.stringify(authors, null, 4) });
    }


    getAuthor = async (res, id) => {
        const author = await prisma.author.findUnique({ where: { id } });
        res.render('author.hbs', { layout: false, data: JSON.stringify(author, null, 4) });
    }



    createAuthor = async (res, dto) => {
        const { name, surname, country, date_of_birth } = dto;

        try {
            const author = await prisma.author.create({
                data: {
                    id: uuidv4(),
                    name,
                    surname,
                    country,
                    date_of_birth: new Date(date_of_birth)
                }
            });
            res.redirect(`/author/${author.id}`);
        }
        catch (err) { error.sendError(res, err); }
    }



    updateAuthor = async (res, dto) => {
        const { id, name, surname, country, date_of_birth } = dto;
        const author = await prisma.author.findUnique({ where: { id } });

        if (!author) {
            error.sendCustomError(res, 404, `Cannot find author with ID = ${id}`);
            return;
        }

        try {
            await prisma.author.update({
                where: { id },
                data: {
                    name,
                    surname,
                    country,
                    date_of_birth: date_of_birth ? new Date(date_of_birth) : undefined
                }
            }).then(async () => {
                res.send(await prisma.author.findUnique({ where: { id } }));
            });
        }
        catch (err) { error.sendError(res, err); }
    }



    deleteAuthor = async (res, id) => {
        try {
            const author = await prisma.author.findUnique({ where: { id } });
            if (!author) {
                error.sendCustomError(res, 404, `Cannot find author with ID = ${id}`);
                return;
            }
            await prisma.author.delete({ where: { id } });
            res.send(author);
        }
        catch (err) { error.sendError(res, err); }
    }
}