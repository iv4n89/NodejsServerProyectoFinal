const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const { dbOpen } = require('../database/config.db');
const Users = dbOpen().models.Users;

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No token in the request'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        console.log(uid);

        //leer el user que corresponde al id
        const user = await Users.findByPk(uid);

        //Verificar si el id tiene estado true o el usuario existe
        if (!user.state || !user) {
            return res.status(401).json({
                msg: 'Not valid token'
            });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Not valid token'
        })
    }
}

module.exports = {
    validarJWT
}