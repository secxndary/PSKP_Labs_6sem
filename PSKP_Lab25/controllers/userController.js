const { UsersCASL } = require('../models');

class UserController {
    async getAllUsers(request, response) {
        try {
            request.ability.throwUnlessCan('manage', 'all');
            const users = await UsersCASL.findAll({
                attributes: ['id', 'username', 'email', 'role'],
            });
            response.status(200).json(users);
        } catch (err) {
            response.status(500).send(err.message);
        }
    }

    async getOneUser(request, response) {
        try {
            request.ability.throwUnlessCan(
                'read',
                new UsersCASL({ id: Number(request.params.id) })
            );
            const user = await UsersCASL.findOne({
                where: {
                    id: request.params.id,
                },
                attributes: ['id', 'username', 'email', 'role'],
            });
            if (user) {
                response.status(200).json(user);
            } else {
                response.status(404).send('User is not found');
            }
        } catch (err) {
            response.status(500).send(err.message);
        }
    }
}

module.exports = new UserController();
