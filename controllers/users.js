const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const User = require('../models/user');
const ConflictError = require('../errors/conflict-err');
const { conflictErrorMessage, userLoginSuccessMessage, logoutMessage } = require('../messages/messages');

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  User.findOne({ email })
    .then((u) => {
      if (u) throw new ConflictError(conflictErrorMessage);
      return bcrypt.hash(password, 10)
        .then((hash) => User.create({ email, password: hash, name }))
        .then((user) => res.status(201).send({ data: user.omitPrivate() }));
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        domain: '',
        httpOnly: true,
      }).send({ message: userLoginSuccessMessage });
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt').send({ message: logoutMessage });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};
