const { PrismaClient } = require('@prisma/client');
const ErrorController = require('./_errorController.js');
const prisma = new PrismaClient();
const uuidv4 = require('uuid').v4;
const error = new ErrorController();


module.exports = class GenreController {

    getGenres = async (req, res) => {
        const genres = await prisma.genre.findMany();
        res.render('genre.hbs', { layout: false, data: JSON.stringify(genres, null, 4) });
    }


    getGenre = async (res, id) => {
        const genre = await prisma.genre.findUnique({ where: { id } });
        res.render('genre.hbs', { layout: false, data: JSON.stringify(genre, null, 4) });
    }



    createGenre = async (res, dto) => {
        const { name, description } = dto;

        try {
            const genre = await prisma.genre.create({
                data: {
                    id: uuidv4(),
                    name,
                    description
                }
            });
            res.send(genre);
        }
        catch (err) { error.sendError(res, err); }
    }



    updateGenre = async (res, dto) => {
        const { id, name, description } = dto;
        const genre = await prisma.genre.findUnique({ where: { id } });

        if (!genre) {
            error.sendCustomError(res, 404, `Cannot find genre with ID = ${id}`);
            return;
        }

        try {
            await prisma.genre.update({
                where: { id },
                data: {
                    name,
                    description,
                }
            }).then(async () => {
                res.send(await prisma.genre.findUnique({ where: { id } }));
            });
        }
        catch (err) { error.sendError(res, err); }
    }



    deleteGenre = async (res, id) => {
        try {
            const genre = await prisma.genre.findUnique({ where: { id } });
            if (!genre) {
                error.sendCustomError(res, 404, `Cannot find genre with ID = ${id}`);
                return;
            }
            await prisma.genre.delete({ where: { id } });
            res.send(genre);
        }
        catch (err) { error.sendError(res, err); }
    }
}