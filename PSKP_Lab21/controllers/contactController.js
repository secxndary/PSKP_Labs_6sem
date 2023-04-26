const contactService = require('../services/contactService');


module.exports = {

    async getAllContacts(request, response) {
        try {
            const contacts = await contactService.getAllContacts();
            response.render('contacts', {
                buttonsEnabled: true,
                contacts: contacts
            });
        } catch (error) {
            console.log(error);
        }
    },


    async getContact(request, response) {

        try {
            if (request.query.id) {
                const contact = await contactService.getContact(request.query.id);
                response.type('json');
                response.end(JSON.stringify(contact));
            } else {
                response.end('Parameter not found');
            }
        } catch (error) {
            console.log(error);
        }
    },


    async addContact(request, response) {
        if (request.body.name && request.body.phone) {
            await contactService.addContact(request.body)
                .then((result) => {
                    response.type('json');
                    response.end(JSON.stringify(result));
                })
                .catch((err) => {
                    console.error(err.message);
                });
        } else {
            response.end('Parameters not found');
        }
    },


    async addContactView(request, response) {
        let contacts = [];
        await contactService.getAllContacts().then(result => contacts = result);
        response.render('newContact', {
            buttonsEnabled: false,
            contacts: contacts
        });
    },


    async editContact(request, response) {
        if (request.query.id && request.body.name && request.body.phone) {
            await contactService.editContact(request.query.id, request.body)
                .then((result) => {
                    response.type('json');
                    response.end(JSON.stringify(result));
                })
                .catch((err) => {
                    console.error(err.message);
                });
        } else {
            response.end('Parameters not found');
        }
    },


    async editContactView(request, response) {
        let contacts = [], contact;
        await contactService.getAllContacts().then(result => contacts = result);
        await contactService.getContact(request.query.id).then(result => contact = result);
        response.render('editContact', {
            buttonsEnabled: false,
            contacts: contacts,
            currentContact: contact
        });
    },


    async deleteContact(request, response) {
        if (request.query.id) {
            await contactService.deleteContact(request.query.id)
                .then((result) => {
                    response.type('json');
                    response.end(JSON.stringify(result));
                })
                .catch((err) => {
                    console.error(err.message);
                });
        } else {
            response.end('Parameters not found');
        }
    }
};