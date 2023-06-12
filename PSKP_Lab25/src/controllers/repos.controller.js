import prisma from '../db.js'
import defineAbilityFor from '../casl/casl-abilities.js'
import { subject, ForbiddenError } from '@casl/ability'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library.js'

class reposContorller {
    async findAll(_, res) {
        const repos = await prisma.repo.findMany()

        res.json(repos)
    }

    async findOne(req, res) {
        try {
            const repo = await prisma.repo.findUnique({
                where: {
                    id: Number(req.params['id']),
                },
            })

            if (!repo) {
                return res.status(404).json({ code: 404, message: 'not found' })
            }

            const ability = defineAbilityFor(req.user)
            ForbiddenError.from(ability).throwUnlessCan(
                'read',
                subject('Repo', repo)
            )

            res.json(repo)
        } catch (e) {
            console.log(e)

            switch (true) {
                case e instanceof ForbiddenError:
                    return res
                        .status(403)
                        .json({ code: 403, message: '[ERROR] 403: Forbidden' })

                case e instanceof PrismaClientKnownRequestError:
                    return res
                        .status(409)
                        .json({ code: 409, message: '[ERROR] 409: Conflict' })

                default:
                    return res
                        .status(400)
                        .json({ code: 400, message: '[ERROR] 400: Bad request' })
            }
        }
    }

    async create(req, res) {
        try {
            const repo = await prisma.$transaction(async (tx) => {
                const repo = await tx.repo.create({
                    data: {
                        name: req.body['name'],
                        user: {
                            connect: {
                                id: Number(req.user['id']),
                            },
                        },
                    },
                })

                const ability = defineAbilityFor(req.user)
                ForbiddenError.from(ability).throwUnlessCan(
                    'create',
                    subject('Repo', repo)
                )

                return repo
            })

            res.json(repo)
        } catch (e) {
            console.log(e)

            switch (true) {
                case e instanceof ForbiddenError:
                    return res
                        .status(403)
                        .json({ code: 403, message: '[ERROR] 403: Forbidden' })

                case e instanceof PrismaClientKnownRequestError:
                    return res
                        .status(409)
                        .json({ code: 409, message: '[ERROR] 409: Conflict' })

                default:
                    return res
                        .status(400)
                        .json({ code: 400, message: '[ERROR] 400: Bad request' })
            }
        }
    }

    async update(req, res) {
        try {
            const repo = await prisma.$transaction(async (tx) => {
                const repo = await tx.repo.update({
                    where: {
                        id: Number(req.params['id']),
                    },
                    data: {
                        name: req.body['name'],
                    },
                })

                const ability = defineAbilityFor(req.user)
                ForbiddenError.from(ability).throwUnlessCan(
                    'update',
                    subject('Repo', repo)
                )

                return repo
            })

            res.json(repo)
        } catch (e) {
            console.log(e)

            switch (true) {
                case e instanceof ForbiddenError:
                    return res
                        .status(403)
                        .json({ code: 403, message: '[ERROR] 403: Forbidden' })

                case e instanceof PrismaClientKnownRequestError:
                    return res
                        .status(409)
                        .json({ code: 409, message: '[ERROR] 409: Conflict' })

                default:
                    return res
                        .status(400)
                        .json({ code: 400, message: '[ERROR] 400: Bad request' })
            }
        }
    }

    async delete(req, res) {
        try {
            const repo = await prisma.$transaction(async (tx) => {
                const repo = await tx.repo.delete({
                    where: {
                        id: Number(req.params['id']),
                    },
                })

                const ability = defineAbilityFor(req.user)
                ForbiddenError.from(ability).throwUnlessCan(
                    'delete',
                    subject('Repo', repo)
                )

                return repo
            })

            res.json(repo)
        } catch (e) {
            console.log(e)

            switch (true) {
                case e instanceof ForbiddenError:
                    return res
                        .status(403)
                        .json({ code: 403, message: '[ERROR] 403: Forbidden' })

                case e instanceof PrismaClientKnownRequestError:
                    return res
                        .status(409)
                        .json({ code: 409, message: '[ERROR] 409: Conflict' })

                default:
                    return res
                        .status(400)
                        .json({ code: 400, message: '[ERROR] 400: Bad request' })
            }
        }
    }
}

export const controller = new reposContorller()
