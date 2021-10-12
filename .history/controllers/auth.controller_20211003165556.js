const { request, response } = require('express');
const bcrypjs = require('bcryptjs');

const { dbOpen } = require('../database/config.db');
const Users = dbOpen().models.Users;
const generateJWT = require('../helpers/generate-jwt');

const login = async (req = request, res = response) => {
    const { email, password } = req.body;
    
    try {
        //Verificar si el email existe
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({
                msg: 'User/Password is not correct'
            });
        }

        //Verifica si el usuario esta activo
        if (!user.state) {
            return res.status(400).json({
                msg: 'User is not active'
            });
        }

        //Verificar la contraseña
        const validarPassword = bcrypjs.compareSync(password, user.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg: 'User/Password is not correct'
            });
        }

        //Generar el JSON Web Token
        const token = await generateJWT(user.id);

        const { password: passwordValues, state,  ...userValues } = user.dataValues;

        res.json({
            ok: true,
            userValues,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Talk to administrator'
        });
    }
}

const renewToken = async (req = request, resp = response) => {
    const { id } = req;
    const dbuser = await Users.findByPk(id);

    const token = await generateJWT(id, dbuser.name);

    return resp.json({
        ok: true,
        userValues: {
            id,
            name: dbuser.name,
            email: dbuser.email,
            role: dbuser.role,
        },
        token
    })
}

module.exports = {
    login
}