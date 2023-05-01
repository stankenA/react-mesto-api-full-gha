const { Joi, celebrate } = require('celebrate');
const { REGEXP_URL } = require('../utils/constants');

const validationForUserParams = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

const validationForUserDescription = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validationForUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(new RegExp(REGEXP_URL)),
  }),
});

module.exports = {
  validationForUserParams,
  validationForUserDescription,
  validationForUserAvatar,
};
