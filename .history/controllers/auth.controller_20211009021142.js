const { request, response } = require('express');
const bcrypjs = require('bcryptjs');

const { dbOpen } = require('../database/config.db');
const Users = dbOpen().models.Users;
const generateJWT = require('../helpers/generate-jwt');

// const login = async (req = request, res = response) => {
//     const { email, password } = req.body;
    
//     try {
//         //Verificar si el email existe
//         const user = await Users.findOne({ where: { email } });
//         if (!user) {
//             return res.status(400).json({
//                 msg: 'User/Password is not correct'
//             });
//         }

//         //Verifica si el usuario esta activo
//         if (!user.state) {
//             return res.status(400).json({
//                 msg: 'User is not active'
//             });
//         }

//         //Verificar la contraseña
//         const validarPassword = bcrypjs.compareSync(password, user.password);
//         if (!validarPassword) {
//             return res.status(400).json({
//                 msg: 'User/Password is not correct'
//             });
//         }

//         //Generar el JSON Web Token
//         const token = await generateJWT(user.id);

//         const { password: passwordValues, state,  ...userValues } = user.dataValues;

//         res.json({
//             ok: true,
//             userValues,
//             token
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             msg: 'Talk to administrator'
//         });
//     }
// }

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

// const renewToken = async (req = request, resp = response) => {
//     const { id } = req.user;
//     const dbuser = await Users.findByPk(id);

//     const token = await generateJWT(id, dbuser.name);

//     return resp.json({
//         ok: true,
//         userValues: {
//             id,
//             name: dbuser.name,
//             email: dbuser.email,
//             role: dbuser.role,
//         },
//         token
//     })
// }

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