const { Repos, Commits } = require('../models');


class CommitsController {
    async getAllCommitsByRepo(req, res) {
        try {
            req.ability.throwUnlessCan(
                'read',
                await Repos.findByPk(req.params.id)
            );
            const commits = await Commits.findAll({
                include: [
                    {
                        model: Repos,
                        required: true,
                        where: {
                            id: req.params.id,
                        },
                        attributes: [],
                    },
                ],
            });
            return res.status(200).end(JSON.stringify(commits, null, 4));
        } catch (err) {
            console.log(err);
            res.status(403).send('[ERROR] 403: You dont have permissions to view this repo, or your token has expired.');
        }
    }


    async getOneCommitByRepo(req, res) {
        try {

            const commit = await Commits.findOne({
                where: {
                    id: req.params.commitId,
                },
                include: [
                    {
                        model: Repos,
                        required: true,
                        where: {
                            id: req.params.id,
                        },
                        attributes: [],
                    },
                ],
            });
            if (commit)
                return res.status(200).end(JSON.stringify(commits, null, 4));
            else
                return res.status(404).send('[ERROR] 404: Commit is not found.');
        } catch (err) {
            console.log(err);
            res.status(500).send(err.message);
        }
    }


    async createCommitByRepo(req, res) {
        try {
            req.ability.throwUnlessCan(
                'createU',
                await Repos.findByPk(req.params.id)
            );
            const commit = await Commits.create({
                message: req.body.message,
                repoId: req.params.id,
            });
            return res.status(201).end(JSON.stringify(commit, null, 4));
        } catch (err) {
            console.log(err);
            res.status(500).send(err.message);
        }
    }


    async updateCommitByRepo(req, res) {
        try {
            req.ability.throwUnlessCan(
                'update',
                await Repos.findByPk(req.params.id)
            );
            await Commits.update(
                {
                    message: req.body.message,
                },
                {
                    where: {
                        id: req.params.commitId,
                    },
                    include: [
                        {
                            model: Repos,
                            required: true,
                            where: {
                                id: req.params.id,
                            },
                            attributes: [],
                        },
                    ],
                }
            );
            res.status(200).send('Commit is updated');
        } catch (err) {
            console.log(err);
            res.status(500).send(err.message);
        }
    }


    async deleteCommitByRepo(req, res) {
        try {
            req.ability.throwUnlessCan('manage', 'all');
            await Commits.destroy({
                where: {
                    id: req.params.commitId,
                },
                include: [
                    {
                        model: Repos,
                        required: true,
                        where: {
                            id: req.params.id,
                        },
                        attributes: [],
                    },
                ],
            });
            res.status(200).send('Commit is deleted');
        } catch (err) {
            console.log(err);
            res.status(500).send(err.message);
        }
    }
}


module.exports = new CommitsController();