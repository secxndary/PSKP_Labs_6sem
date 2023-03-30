const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


module.exports = class AuthorController {
    getAuthors = async (req, res) => {
        const authors = await prisma.author.findMany({});
        console.log({ authors, });
        console.log('controller');
        res.send(JSON.stringify(authors, null, 4));
        // res.render('faculty.hbs', { layout: false, data: faculties });
    }

    getAuthor = async (res, id) => { }

    createAuthor = async (res, dto) => { }

    updateAuthor = async (res, dto) => { }

    deleteAuthor = async (res, id) => { }
}