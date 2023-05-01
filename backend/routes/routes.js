const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const {
  login,
  createUser,
} = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const {
  validationForLogin,
  validationForRegistration,
} = require('../validation/auth');

router.post('/signin', validationForLogin, login);
router.post('/signup', validationForRegistration, createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use((req, res, next) => {
  next(new NotFoundError('404 страница не найдена'));
});

module.exports = router;
