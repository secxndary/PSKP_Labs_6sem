import { AbilityBuilder, PureAbility, subject } from '@casl/ability'

function lambdaMatcher(matchConditions) {
    return matchConditions
}

export default function defineAbilityFor(user) {
    const { can, build, cannot } = new AbilityBuilder(PureAbility)

    switch (user?.role) {
        case 'user':
            can('read', 'User', ({ id }) => id === user.id)
            can('read', 'Repo', ({ userId }) => userId === user.id)
            can('read', 'Commit', ({ repo }) => repo.userId === user.id)

            can('create', 'Repo')
            can('create', 'Commit', ({ repo }) => repo.userId === user.id)

            can('update', 'Repo', ({ userId }) => userId === user.id)
            can('update', 'Commit', ({ repo }) => repo.userId === user.id)

            cannot('read', 'Users')
            break
        case 'admin':
            can('manage', 'all')
            break
    }

    return build({ conditionsMatcher: lambdaMatcher })
}

// ; (async () => {
//     const ability = defineAbilityFor(
//         await prisma.user.findUnique({
//             where: {
//                 id: 4,
//             },
//         })
//     )

// console.log(
//     ability.can(
//         'read',
//         subject(
//             'Repo',
//             await prisma.repo.findFirst({
//                 where: {
//                     userId: 1,
//                 },
//             })
//         )
//     )
// )

// console.log(
//     ability.can(
//         'update',
//         subject(
//             'Repo',
//             await prisma.repo.findFirst({
//                 where: {
//                     userId: 1,
//                 },
//             })
//         )
//     )
// )

//     console.log(
//         ability.can(
//             'delete',
//             subject(
//                 'Repo',
//                 await prisma.repo.findFirst({
//                     where: {
//                         userId: 1,
//                     },
//                 })
//             )
//         )
//     )
// })()
