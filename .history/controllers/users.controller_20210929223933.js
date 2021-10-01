const { request, response } = require('express');
const { dbOpen } = require('../database/config.db');
const Users = dbOpen().models.Users;

const allUsersGet = (req = request, res = response) => {
    Users.findAll({})
        .then(response => res.json(response))
        .catch(error => {
            res.status(412).json({ msg: error.message });
        });
}



module.exports = {
    allUsersGet,
    
}