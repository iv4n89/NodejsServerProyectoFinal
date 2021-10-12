const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const { dbOpen } = require('../database/config.db');
const generateJWT = require('../helpers/generate-jwt');
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

// const oneUserGet = async (req = request, res = response) => {

//     const user = await Users.findOne({ where: req.params });
//     const { password, ...resto } = user.dataValues;

//     res.status(200).json(resto);
// }

const oneUserGet = (req, res) => {
    Users.findOne({ where: req.params })
        .then(result => {
            res.status(200).json(result);
        }).catch(err => res.status(400).json({ msg: err.message }));
}

const newUserPost = async (req = request, res = response) => {

    const { name, email, password, role } = req.body;

    try {
        const user = new Users({ name, email, password, role });

        //Verificar si email existe
        const userEmail = await Users.findOne({ where: { email } });
        if (userEmail) {
            return res.status(400).json({
                msg: 'This email already exists in the database'
            });
        }

        //Encriptar pass
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt);

        //Generar el token
        const token = await generateJWT(user.id);

        await user.save();

        res.status(201).json({
            ok: true,
            user,
            token
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Talk with the admin'
        })
    }
}

const userUpdate = async (req = request, res = response) => {

    const { id } = req.params;
    const { password, ...resto } = req.body;

    try {
        //TODO validar contraseña contra la db
        if (password) {
            const salt = bcrypt.genSaltSync(10);
            resto.password = bcrypt.hashSync(password, salt);
        }

        const user = await Users.update(resto, { where: { id } });

        if (!user) {
            return res.json({ ok: false });
        }

        return res.json({ok: true});
    } catch (error) {
        return res.json({ ok: false });
    }
}

const userDelete = async (req = request, res = response) => {
    try {
        await Users.destroy({ where: req.params });

        res.status(200).json({
            ok: true
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Talk with the admin'
        })
    }
}

const checkPassword = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ where: {email} });
        const validarPassword = bcrypt.compareSync(password, user.password);
        console.log(validarPassword);

        if (!validarPassword) {
            return res.json({ ok: false });
        } else {
            return res.status(200).json({ ok: true });
        }
    } catch (error) {
        return res.status(500).json({
            msg: 'Talk to the admin'
        })
    }
}



module.exports = {
    allUsersGet,
    checkPassword,
    newUserPost,
    oneUserGet,
    userDelete,
    userUpdate
}