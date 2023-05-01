const { Joi, celebrate } = require('celebrate');
const { REGEXP_URL } = require('../utils/constants');

const validationForCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().regex(new RegExp(REGEXP_URL)),
  }),
});

const validationForCardParams = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validationForCardBody,
  validationForCardParams,
};
