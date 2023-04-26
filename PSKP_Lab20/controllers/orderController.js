const { PrismaClient } = require('@prisma/client');
const ErrorController = require('./_errorController.js');
const prisma = new PrismaClient();
const uuidv4 = require('uuid').v4;
const error = new ErrorController();


module.exports = class OrderController {

    getOrders = async (req, res) => {
        const orders = await prisma.order.findMany();
        res.render('order.hbs', { layout: false, data: JSON.stringify(orders, null, 4) });
    }


    getOrder = async (res, id) => {
        const order = await prisma.order.findUnique({ where: { id } });
        res.render('order.hbs', { layout: false, data: JSON.stringify(order, null, 4) });
    }



    createOrder = async (res, dto) => {
        const { book_id, customer_id, order_date, qty, amount } = dto;
        const book = await prisma.book.findUnique({ where: { id: book_id } });
        const customer = await prisma.customer.findUnique({ where: { id: customer_id } });

        if (!book) { error.sendCustomError(res, 404, `Cannot find book with ID = ${book_id}`); return; }
        if (!customer) { error.sendCustomError(res, 404, `Cannot find customer with ID = ${customer_id}`); return; }

        try {
            const order = await prisma.order.create({
                data: {
                    id: uuidv4(),
                    book_id,
                    customer_id,
                    order_date: new Date(order_date),
                    qty: Number(qty),
                    amount: Number(amount)
                }
            });
            res.send(order);
        }
        catch (err) { console.log(err); error.sendError(res, err); }
    }



    updateOrder = async (res, dto) => {
        const { id, book_id, customer_id, order_date, qty, amount } = dto;
        if (book_id) {
            const book = await prisma.book.findUnique({ where: { id: book_id } });
            if (!book) { error.sendCustomError(res, 404, `Cannot find book with ID = ${book_id}`); return; }
        }
        if (customer_id) {
            const customer = await prisma.customer.findUnique({ where: { id: customer_id } });
            if (!customer) { error.sendCustomError(res, 404, `Cannot find customer with ID = ${customer_id}`); return; }
        }

        console.log({ dto });
        console.log(Number(undefined));
        try {
            await prisma.order.update({
                where: { id },
                data: {
                    book_id,
                    customer_id,
                    order_date: order_date ? new Date(order_date) : undefined,
                    qty: qty ? Number(qty) : undefined,
                    amount: amount ? Number(amount) : undefined
                }
            }).then(async () => {
                res.send(await prisma.order.findUnique({ where: { id } }));
            });
        }
        catch (err) { console.log(err); error.sendError(res, err); }
    }



    deleteOrder = async (res, id) => {
        const order = await prisma.order.findUnique({ where: { id } });
        try {
            if (!order) {
                error.sendCustomError(res, 404, `Cannot find order with ID = ${id}`);
                return;
            }
            await prisma.order.delete({ where: { id } });
            res.send(order);
        }
        catch (err) { error.sendError(res, err); }
    }
}