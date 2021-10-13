const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const { dbOpen } = require('../database/config.db');
const generateJWT = require('../helpers/generate-jwt');
const Users = dbOpen().models.Users;
const Comments = dbOpen().models.Comments;
const Films = dbOpen().models.Films;

const allUsersGet = (req, res) => {
    const { limit = 5, offset = 0 } = req.query;
    const query = { state: true };

    Promise.all([
        Users.count(query),
        Users.findAll({ where: query, limit, offset })
    ]).then(([total, users]) => {
        res.status(200).json({ total, users })
    }).catch(err => res.status(400).json(err.message));
}

const oneUserGet = (req, res) => {
    Users.findOne({ where: req.params })
        .then(result => {
            const { password, ...rest } = result.dataValues;
            res.status(200).json(rest);
        }).catch(err => res.status(400).json({ msg: err.message }));
}

const newUserPost = (req, res) => {
    const { name, email, password, role, img } = req.body;
     //Encriptar pass
    const salt = bcrypt.genSaltSync(10);
    const encripted_pass = bcrypt.hashSync(password, salt);

    Users.create({ name, email, password: encripted_pass, role, img })
        .then(result1 => {
            generateJWT(result1.id)
                .then(result2 => {
                    res.status(201).json({
                        ok: true,
                        user: result1,
                        token: result2
                    }).catch(err => res.status(400).json({ msg: err.message }));
                }
            )
        })
}

const userUpdate = (req, res) => {
    const { id } = req.params;
    const { password, ...resto } = req.body;

    //Encriptar contraseña
    if (password) {
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password, salt);
    }

    Users.update(resto, { where: { id } })
        .then(result => {
            res.status(200).json({ ok: true })
        }).catch(err => res.status(400).json({ msg: err.message }));
}

const userDelete = (req, res) => {

    Comments.destroy({ where: { UserId: req.params.id } })
        .then(result => result)
        .catch(err => err);
    
    Films.update({ UserId: 0 }, { where: { UserId: req.params.id } })
        .then(result => result)
        .catch(err => err);
    
        Users.destroy({ where: req.params })
            .then(result => {
                res.status(200).json({ ok: true })
            }).catch(err => res.status(400).json({ msg: err.message }));
    }

const checkPassword = (req, res) => {
    const { email, password } = req.body;

    Users.findOne({ where: { email } })
        .then(result => {
            const validarPassword = bcrypt.compareSync(password, result.password);
            if (!validarPassword) {
                return res.json({ ok: false });
            }
            return res.status(200).json({ ok: true });
        }).catch(err => res.status(400).json({ msg: err.message }));
}



module.exports = {
    allUsersGet,
    checkPassword,
    newUserPost,
    oneUserGet,
    userDelete,
    userUpdate
}