const { Repos, Commits } = require('../models');

class ReposController {
    async getAllRepos(req, res) {
        try {
            req.ability.throwUnlessCan('manages', 'all');
            const repos = await Repos.findAll();
            res.status(200).json(repos);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getOneRepo(req, res) {
        try {
            req.ability.throwUnlessCan(
                'read',
                await Repos.findByPk(req.params.id)
            );
            const repo = await Repos.findOne({
                where: {
                    id: req.params.id,
                },
            });

            if (repo) {
                res.status(200).json(repo);
            } else {
                res.status(404).send('[ERROR] 404: Repo is not found');
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async createRepo(req, res) {
        try {
            req.ability.throwUnlessCan('createU', 'Repos');
            const repo = await Repos.create({
                name: req.body.name,
                authorId: req.payload.id,
            });
            res.status(201).json(repo);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async updateRepo(req, res) {
        try {
            req.ability.throwUnlessCan(
                'update',
                await Repos.findByPk(req.params.id)
            );
            const repo = await Repos.findOne({
                where: {
                    id: req.params.id,
                },
            });
            if (repo) {
                await Repos.update(
                    {
                        name: req.body.name,
                    },
                    {
                        where: {
                            id: req.params.id,
                        },
                    }
                );

                res.status(201).send('Repo is updated');
            } else res.status(404).send('[ERROR] 404: Repo is not found');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async deleteRepo(req, res) {
        try {
            req.ability.throwUnlessCan('manage', 'all');
            const repo = await Repos.findOne({
                where: {
                    id: req.params.id,
                },
            });
            if (repo) {
                await Repos.destroy({
                    where: {
                        id: req.params.id,
                    },
                });
                res.status(201).send('Repo is deleted');
            } else res.status(404).send('[ERROR] 404: Repo is not found');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getAllCommitsByRepo(req, res) {
        try {
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
            res.status(200).json(commits);
        } catch (err) {
            res.status(500).send(err.message);
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
            if (commit) res.status(200).json(commit);
            else res.status(404).send('[ERROR] 404: Commit is not found');
        } catch (err) {
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
            res.status(201).send(commit);
        } catch (err) {
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
            res.status(500).send(err.message);
        }
    }
}

module.exports = new ReposController();
