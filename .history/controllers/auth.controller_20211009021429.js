const { request, response } = require('express');
const bcrypjs = require('bcryptjs');

const { dbOpen } = require('../database/config.db');
const Users = dbOpen().models.Users;
const generateJWT = require('../helpers/generate-jwt');

const login = (req, res) => {
    const { email, password } = req.body;

    Users.findOne({ where: { email } })
        .then(result => {
            const validarPassword = bcrypjs.compareSync(password, result.password);
            if (!validarPassword) {
                return res.status(400).json({
                    msg: 'User/Password is not correct'
                });
            }
            const { password: passwordValues, state, ...userValues } = result.dataValues;
            generateJWT(userValues.id)
                .then(token => {
                    res.status(200).json({
                        ok: true,
                        userValues,
                        token
                    })
                })
        }).catch(err => res.status(400).json({ msg: err.message }));
}

const renewToken = (req, res) => {
    const { id } = req.user;

    Users.findByPk(id)
        .then(result => {
            generateJWT(id)
                .then(token => {
                    res.status(200).json({
                        ok: true,
                        userValues: {
                            id,
                            name: result.name,
                            email: result.email,
                            role: result.role
                        },
                        token
                    });
                })
        })
}

module.exports = {
    login, renewToken
}