const { Joi, celebrate } = require('celebrate');
const { REGEXP_URL } = require('../utils/constants');

const validationForLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

const validationForRegistration = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(new RegExp(REGEXP_URL)),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

module.exports = {
  validationForLogin,
  validationForRegistration,
};
