const Router = require('express');
const router = new Router();
const abilityRouter = require('./abilityRouter');
const userRouter = require('./userRouter');
const reposRouter = require('./reposRouter');


router
    .use('/user', userRouter)
    .use('/ability', abilityRouter)
    .use('/repos', reposRouter);


module.exports = router;