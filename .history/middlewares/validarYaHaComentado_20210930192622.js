const { request, response } = require('express');

const yaHaComentado = (req = request, res = response, next) => {
    const user = req.user;
    const { UserId } = req.body;
    console.log(user.id, UserId);

    next();
}

module.exports = {
    yaHaComentado
}