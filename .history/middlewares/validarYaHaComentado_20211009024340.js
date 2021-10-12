const { request, response } = require('express');
const { dbOpen } = require('../database/config.db');
const Comments = dbOpen().models.Comments;

const yaHaComentado = (req = request, res = response, next) => {
    const { id: UserId } = req.user;
    const { filmId: FilmId } = req.query;
    console.log(UserId, FilmId);
    
    // Comments.findOne({ where: { FilmId, UserId } })
    //     .then(result => {
    //         if (!result) {
    //             return res.status(400).json({ msg: 'The user has already posted a comment for this films' });
    //         }
    //     });

    next();
}

module.exports = {
    yaHaComentado
}