const authRouter = require('express').Router();
const { createUser, login, logout } = require('../controllers/users');
const { createUserValidator, loginValidator } = require('../validators/auth-validators');

authRouter.post('/signup', createUserValidator, createUser);
authRouter.post('/signin', loginValidator, login);
authRouter.post('/logout', logout);

module.exports = authRouter;
