/* eslint-disable no-useless-escape */
const REGEXP_URL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const allowedCors = [
  'http://stankena-mesto.nomoredomains.monster',
  'https://stankena-mesto.nomoredomains.monster',
  'https://api.stankena-mesto.nomoredomains.monster',
  'https://api.stankena-mesto.nomoredomains.monster',
  'localhost:3000',
];

module.exports = {
  REGEXP_URL,
  allowedCors,
};
