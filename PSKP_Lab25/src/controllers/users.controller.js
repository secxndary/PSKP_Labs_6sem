import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library.js'
import defineAbilityFor from '../casl/casl-abilities.js'
import { subject, ForbiddenError } from '@casl/ability'
import prisma from '../db.js'

class usersController {
    async findAll(req, res) {
        try {
            const users = await prisma.user.findMany()

            const ability = defineAbilityFor(req.user)
            ForbiddenError.from(ability).throwUnlessCan(
                'read',
                subject('Users', users)
            )

            res.json(
                users.map((user) => {
                    const { rt, password, ...rest } = user
                    return rest
                })
            )
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

    async findOne(req, res) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: Number(req.params.id),
                },
            })

            const ability = defineAbilityFor(req.user)
            ForbiddenError.from(ability).throwUnlessCan(
                'read',
                subject('User', user)
            )

            if (!user) {
                return res.writeHead(404).end('not found')
            }

            const { rt, password, ...rest } = user
            res.json(rest)
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

export const constoller = new usersController()
