const usersRouter = require('express').Router();
const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const {
  validationForUserParams,
  validationForUserDescription,
  validationForUserAvatar,
} = require('../validation/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);
usersRouter.get('/:userId', validationForUserParams, getUserById);
usersRouter.patch('/me', validationForUserDescription, updateUser);
usersRouter.patch('/me/avatar', validationForUserAvatar, updateAvatar);

module.exports = usersRouter;
