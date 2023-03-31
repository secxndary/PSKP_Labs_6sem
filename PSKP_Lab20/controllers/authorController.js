const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


module.exports = class AuthorController {
    getAuthors = async (req, res) => {
        const authors = await prisma.author.findMany({});
        console.log('controller');
        res.render('author.hbs', { layout: false, data: JSON.stringify(authors, null, 4) });
    }

    getAuthor = async (res, id) => { }

    createAuthor = async (res, dto) => { }

    updateAuthor = async (res, dto) => { }

    deleteAuthor = async (res, id) => { }
}