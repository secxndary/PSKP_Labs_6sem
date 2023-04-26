const { PrismaClient } = require('@prisma/client');
const ErrorController = require('./_errorController.js');
const prisma = new PrismaClient();
const uuidv4 = require('uuid').v4;
const error = new ErrorController();


module.exports = class BookController {

    getBooks = async (req, res) => {
        const books = await prisma.book.findMany();
        res.render('book.hbs', { layout: false, data: JSON.stringify(books, null, 4) });
    }


    getBook = async (res, id) => {
        const book = await prisma.book.findUnique({ where: { id } });
        res.render('book.hbs', { layout: false, data: JSON.stringify(book, null, 4) });
    }



    createBook = async (res, dto) => {
        const { author_id, title, pages } = dto;
        const author = await prisma.author.findUnique({ where: { id: author_id } });

        if (!author) { error.sendCustomError(res, 404, `Cannot find author with ID = ${author_id}`); return; }

        try {
            const book = await prisma.book.create({
                data: {
                    id: uuidv4(),
                    author_id,
                    title,
                    pages
                }
            });
            res.send(book);
        }
        catch (err) { console.log(err); error.sendError(res, err); }
    }



    updateBook = async (res, dto) => {
        const { id, author_id, title, pages } = dto;
        const book = await prisma.book.findUnique({ where: { id } });
        if (!book) { error.sendCustomError(res, 404, `Cannot find book with ID = ${id}`); return; }

        if (author_id) {
            const author = await prisma.author.findUnique({ where: { id: author_id } });
            if (!author) { error.sendCustomError(res, 404, `Cannot find author with ID = ${author_id}`); return; }
        }

        try {
            await prisma.book.update({
                where: { id },
                data: {
                    author_id,
                    title,
                    pages: pages ? Number(pages) : undefined
                }
            }).then(async () => {
                res.send(await prisma.book.findUnique({ where: { id } }));
            });
        }
        catch (err) { error.sendError(res, err); }
    }



    deleteBook = async (res, id) => {
        const book = await prisma.book.findUnique({ where: { id } });
        try {
            if (!book) {
                error.sendCustomError(res, 404, `Cannot find book with ID = ${id}`);
                return;
            }
            await prisma.book.delete({ where: { id } });
            res.send(book);
        }
        catch (err) { error.sendError(res, err); }
    }
}