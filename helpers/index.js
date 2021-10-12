

const dbValidators = require('./db.validators');
const generateJWS = require('./generate-jwt');
const uploadFiles = require('./uploadFiles');

module.exports = {
    ...dbValidators,
    ...generateJWS,
    ...uploadFiles
}