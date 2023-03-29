import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default class AuthorController {
    getAuthors = async () => {
        const authors = prisma.author.findMany({});
        console.log({ authors, });
        console.log('controller');
        return JSON.stringify(authors, null, 4);
        // res.render('faculty.hbs', { layout: false, data: faculties });
    }

    getAuthor = async (res, id) => { }

    createAuthor = async (res, dto) => { }

    updateAuthor = async (res, dto) => { }

    deleteAuthor = async (res, id) => { }
}