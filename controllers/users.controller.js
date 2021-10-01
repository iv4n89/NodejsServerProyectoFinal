const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const { dbOpen } = require('../database/config.db');
const Users = dbOpen().models.Users;

const allUsersGet = async (req = request, res = response) => {
    const { limit = 5, offset = 0 } = req.query;
    const query = { state: true };

    const [total, users] = await Promise.all([
        Users.count(query),
        Users.findAll({ where: query, limit, offset })
    ]);

    res.status(200).json({
        total,
        users
    });
}

const oneUserGet = async (req = request, res = response) => {

    const user = await Users.findOne({ where: req.params });
    const { password, ...resto } = user.dataValues;

    res.status(200).json({ user: resto });
}

const newUserPost = async (req = request, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new Users({ name, email, password, role });

    //Encriptar pass
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    res.status(201).json(user);
}

const userUpdate = async (req = request, res = response) => {

    const { id } = req.params;
    const { password, ...resto } = req.body;

    //TODO validar contraseña contra la db
    if (password) {
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password, salt);
    }

    const user = await Users.update(resto, { where: { id } });

    res.json(user);
}

const userDelete = async (req = request, res = response) => {
    await Users.destroy({ where: req.params });

    res.sendStatus(204);
}



module.exports = {
    allUsersGet,
    newUserPost,
    oneUserGet,
    userDelete,
    userUpdate
}