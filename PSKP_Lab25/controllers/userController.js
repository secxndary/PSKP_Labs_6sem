const { UsersCASL } = require('../models');

class UserController {
    async getAllUsers(req, res) {
        try {
            req.ability.throwUnlessCan('manage', 'all');
            const users = await UsersCASL.findAll({
                attributes: ['id', 'username', 'email', 'role'],
            });
            res.status(200).json(users);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getOneUser(req, res) {
        try {
            req.ability.throwUnlessCan(
                'read',
                new UsersCASL({ id: Number(req.params.id) })
            );
            const user = await UsersCASL.findOne({
                where: {
                    id: req.params.id,
                },
                attributes: ['id', 'username', 'email', 'role'],
            });
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).send('User is not found');
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = new UserController();
