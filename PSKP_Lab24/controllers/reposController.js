const { Repos, Commits } = require('../models');

class ReposController {
    async getAllRepos(request, response) {
        try {
            request.ability.throwUnlessCan('manages', 'all');
            const repos = await Repos.findAll();
            response.status(200).json(repos);
        } catch (err) {
            response.status(500).send(err.message);
        }
    }

    async getOneRepo(request, response) {
        try {
            request.ability.throwUnlessCan(
                'read',
                await Repos.findByPk(request.params.id)
            );
            const repo = await Repos.findOne({
                where: {
                    id: request.params.id,
                },
            });

            if (repo) {
                response.status(200).json(repo);
            } else {
                response.status(404).send('Repo is not found');
            }
        } catch (err) {
            response.status(500).send(err.message);
        }
    }

    async createRepo(request, response) {
        try {
            request.ability.throwUnlessCan('createU', 'Repos');
            const repo = await Repos.create({
                name: request.body.name,
                authorId: request.payload.id,
            });
            response.status(201).json(repo);
        } catch (err) {
            response.status(500).send(err.message);
        }
    }

    async updateRepo(request, response) {
        try {
            request.ability.throwUnlessCan(
                'update',
                await Repos.findByPk(request.params.id)
            );
            const repo = await Repos.findOne({
                where: {
                    id: request.params.id,
                },
            });
            if (repo) {
                await Repos.update(
                    {
                        name: request.body.name,
                    },
                    {
                        where: {
                            id: request.params.id,
                        },
                    }
                );

                response.status(201).send('Repo is updated');
            } else response.status(404).send('Repo is not found');
        } catch (err) {
            response.status(500).send(err.message);
        }
    }

    async deleteRepo(request, response) {
        try {
            request.ability.throwUnlessCan('manage', 'all');
            const repo = await Repos.findOne({
                where: {
                    id: request.params.id,
                },
            });
            if (repo) {
                await Repos.destroy({
                    where: {
                        id: request.params.id,
                    },
                });
                response.status(201).send('Repo is deleted');
            } else response.status(404).send('Repo is not found');
        } catch (err) {
            response.status(500).send(err.message);
        }
    }

    async getAllCommitsByRepo(request, response) {
        try {
            const commits = await Commits.findAll({
                include: [
                    {
                        model: Repos,
                        required: true,
                        where: {
                            id: request.params.id,
                        },
                        attributes: [],
                    },
                ],
            });
            response.status(200).json(commits);
        } catch (err) {
            response.status(500).send(err.message);
        }
    }

    async getOneCommitByRepo(request, response) {
        try {

            const commit = await Commits.findOne({
                where: {
                    id: request.params.commitId,
                },
                include: [
                    {
                        model: Repos,
                        required: true,
                        where: {
                            id: request.params.id,
                        },
                        attributes: [],
                    },
                ],
            });
            if (commit) response.status(200).json(commit);
            else response.status(404).send('Commit is not found');
        } catch (err) {
            response.status(500).send(err.message);
        }
    }

    async createCommitByRepo(request, response) {
        try {
            request.ability.throwUnlessCan(
                'createU',
                await Repos.findByPk(request.params.id)
            );
            const commit = await Commits.create({
                message: request.body.message,
                repoId: request.params.id,
            });
            response.status(201).send(commit);
        } catch (err) {
            response.status(500).send(err.message);
        }
    }

    async updateCommitByRepo(request, response) {
        try {
            request.ability.throwUnlessCan(
                'update',
                await Repos.findByPk(request.params.id)
            );
            await Commits.update(
                {
                    message: request.body.message,
                },
                {
                    where: {
                        id: request.params.commitId,
                    },
                    include: [
                        {
                            model: Repos,
                            required: true,
                            where: {
                                id: request.params.id,
                            },
                            attributes: [],
                        },
                    ],
                }
            );
            response.status(200).send('Commit is updated');
        } catch (err) {
            response.status(500).send(err.message);
        }
    }

    async deleteCommitByRepo(request, response) {
        try {
            request.ability.throwUnlessCan('manage', 'all');
            await Commits.destroy({
                where: {
                    id: request.params.commitId,
                },
                include: [
                    {
                        model: Repos,
                        required: true,
                        where: {
                            id: request.params.id,
                        },
                        attributes: [],
                    },
                ],
            });
            response.status(200).send('Commit is deleted');
        } catch (err) {
            response.status(500).send(err.message);
        }
    }
}

module.exports = new ReposController();
