const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');
const authRouter = require('./auth');
const articleRouter = require('./articles');
const userRouter = require('./users');
const { notFoundMessage } = require('../messages/messages');

router.use(authRouter);
router.use(articleRouter);
router.use(userRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError(notFoundMessage));
});

module.exports = router;
