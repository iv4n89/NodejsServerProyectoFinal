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

const userUpdate = (req = request, res = response) => {
    Users.update(req.body, { where: req.params })
        .then(result => res.json(result))
        .catch(error => res.status(412).json({ msg: error.message }));
}

const userDelete = (req = request, res = response) => {
    Users.destroy({ where: req.params })
        .then(result => res.sendStatus(204))
        .catch(error => res.status(412).json({ msg: error.message }));
}



module.exports = {
    allUsersGet,
    newUserPost,
    oneUserGet,
    userDelete,
    userUpdate
}