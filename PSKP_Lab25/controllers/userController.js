const { UsersCASL } = require('../models');

class UserController {
    async getAllUsers(req, res) {
        try {
            req.ability.throwUnlessCan('manage', 'all');
            const users = await UsersCASL.findAll({
                attributes: ['id', 'username', 'email', 'role'],
            });
            res.status(200).end(JSON.stringify(users, null, 4));
        } catch (err) {
            console.log(err);
            res.status(403).send('[ERROR] 403: You dont have permissions to view all users, or your token has expired.');
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
                res.status(200).end(JSON.stringify(user, null, 4));
            } else {
                res.status(404).send('[ERROR] 404: There is no user with such id.');
            }
        } catch (err) {
            console.log(err);
            res.status(403).send('[ERROR] 403: You dont have permissions to view this user, or your token has expired.');
        }
    }
}


module.exports = new UserController();