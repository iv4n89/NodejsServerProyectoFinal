const { dbOpen } = require('../database/config.db');
const Users = dbOpen().models.Users;
const Films = dbOpen().models.Films;
const Comments = dbOpen().models.Comments;

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

const validRole = async (role = 'USER_ROLE') => {
    const roles = Users.rawAttributes.role.values;
    if (!roles.includes(role)) {
        throw new Error(`The role ${role} is not valid`);
    }
}

const filmIdExiste = async (id) => {
    const existeFilm = await Films.findByPk(id);
    if (!existeFilm) {
        throw new Error(`The film with id ${id} does not exist`);
    }
}

const userHasCommentOnFilm = async (req, res, next) => {
    console.log(req);

    next();
}

module.exports = {
    emailExists,
    filmIdExiste,
    userHasCommentOnFilm,
    validUserId,
    validRole
}