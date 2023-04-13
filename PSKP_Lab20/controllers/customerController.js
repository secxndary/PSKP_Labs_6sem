const { PrismaClient } = require('@prisma/client');
const ErrorController = require('./_errorController.js');
const prisma = new PrismaClient();
const uuidv4 = require('uuid').v4;
const error = new ErrorController();


module.exports = class CustomerController {

    getCustomers = async (req, res) => {
        const customers = await prisma.customer.findMany();
        res.render('customer.hbs', { layout: false, data: JSON.stringify(customers, null, 4) });
    }


    getCustomer = async (res, id) => {
        const customer = await prisma.customer.findUnique({ where: { id } });
        res.render('customer.hbs', { layout: false, data: JSON.stringify(customer, null, 4) });
    }



    createCustomer = async (res, dto) => {
        const { author_id, title, pages } = dto;
        const author = await prisma.author.findUnique({ where: { id: author_id } });

        if (!author) { error.sendCustomError(res, 404, `Cannot find author with ID = ${author_id}`); return; }

        try {
            const customer = await prisma.customer.create({
                data: {
                    id: uuidv4(),
                    author_id,
                    title,
                    pages
                }
            });
            res.send(customer);
        }
        catch (err) { console.log(err); error.sendError(res, err); }
    }



    updateCustomer = async (res, dto) => {
        const { id, author_id, title, pages } = dto;
        const customer = await prisma.customer.findUnique({ where: { id } });
        if (!customer) { error.sendCustomError(res, 404, `Cannot find customer with ID = ${id}`); return; }

        if (author_id) {
            const author = await prisma.author.findUnique({ where: { id: author_id } });
            if (!author) { error.sendCustomError(res, 404, `Cannot find author with ID = ${author_id}`); return; }
        }

        try {
            await prisma.customer.update({
                where: { id },
                data: {
                    author_id,
                    title,
                    pages: Number(pages)
                }
            }).then(async () => {
                res.send(await prisma.customer.findUnique({ where: { id } }));
            });
        }
        catch (err) { error.sendError(res, err); }
    }



    deleteCustomer = async (res, id) => {
        const customer = await prisma.customer.findUnique({ where: { id } });
        try {
            if (!customer) {
                error.sendCustomError(res, 404, `Cannot find customer with ID = ${id}`);
                return;
            }
            await prisma.customer.delete({ where: { id } });
            res.send(customer);
        }
        catch (err) { error.sendError(res, err); }
    }
}