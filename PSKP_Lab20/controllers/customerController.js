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
        const { company_name, address, phone } = dto;

        try {
            const customer = await prisma.customer.create({
                data: {
                    id: uuidv4(),
                    company_name,
                    address,
                    phone
                }
            });
            res.send(customer);
        }
        catch (err) { console.log(err); error.sendError(res, err); }
    }



    updateCustomer = async (res, dto) => {
        const { id, company_name, address, phone } = dto;
        const customer = await prisma.customer.findUnique({ where: { id } });
        if (!customer) { error.sendCustomError(res, 404, `Cannot find customer with ID = ${id}`); return; }

        try {
            await prisma.customer.update({
                where: { id },
                data: {
                    company_name,
                    address,
                    phone
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