const { dbOpen } = require('../database/config.db');
const Users = dbOpen().models.Users;

const emailExists = async (email = '') => {
    const existeEmail = await Users.findOne({ where: { email } });
    if (existeEmail) {
        throw new Error('The email already exists');
    }
}

const validUserId = async (id) => {
    const existeUser = await Users.findOne({ where: { id } });
    if (!existeUser) {
        throw new Error(`The user whith id ${id} does not extist`);
    }
}

const validRole = async (role = '') => {
    const roles = Users.rawAttributes.role.values;
    console.log(roles);
    if (!roles.includes(role)) {
        throw new Error(`The role ${role} is not valid`);
    }
}

module.exports = {
    emailExists,
    validUserId,
    validRole
}