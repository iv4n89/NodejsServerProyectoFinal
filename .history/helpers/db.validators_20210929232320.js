const { dbOpen } = require('../database/config.db');
const Users = dbOpen().models.Users;

const emailExists = async (email = '') => {
    const existeEmail = await Users.findOne({ where: { email } });
    if (existeEmail) {
        throw new Error('The email already exists');
    }
}

module.exports = {
    emailExists
}