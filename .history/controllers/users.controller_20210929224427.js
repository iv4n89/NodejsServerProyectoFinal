const { request, response } = require('express');
const { dbOpen } = require('../database/config.db');
const Users = dbOpen().models.Users;

const allUsersGet = (req = request, res = response) => {
    Users.findAll({})
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({ msg: error.message });
        });
}

const oneUserGet = (req = request, res = response) => {

    Users.findOne({ where: req.params })
        .then(result => res.json(result))
        .catch(error => res.status(412).json({ msg: error.message }));
}

const newUserPost = (req = request, res = response) => {
    Users.create(req.body)
        .then(result => res.json(result))
        .catch(error => res.status(412).json({ msg: error.message }));
}



module.exports = {
    allUsersGet,
    newUserPost,
    oneUserGet
}