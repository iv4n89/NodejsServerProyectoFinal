const { request, response } = require('express');
const { dbOpen } = require('../database/config.db');
const Comments = dbOpen().models.Comments;
const Films = dbOpen().models.Films;

/**
 *
 * @param {*} req request
 * @param {*} res response
 *
 * Get all the comments for a film. 
 * Pagination activated on the request. Query params: limit & offset
 */
const allComments = async (req = request, res = response) => {

    const { limit = 5, offset = 0 } = req.query;
    const query = { FilmId: req.params.id };

    const [total, comments] = await Promise.all([
        Comments.count({ where: query }),
        Comments.findAll({ where: query, limit, offset })
    ]);

    res.status(200).json({
        total,
        comments
    });
}

/**
 * 
 * @param {*} req request
 * @param {*} res response
 * 
 * Get one comment, given the film id that belongs to and the comment id
 */
const oneCommentGet = async (req = request, res = response) => {

    const { filmId: FilmId, commId: id } = req.params;

    const comment = await Comments.findOne({ where: { id, FilmId } });

    res.status(200).json({
        comment
    });
}

const oneCommentByUserGet = async (req = request, res = response) => {
    const { filmId: FilmId } = req.params;
    const { id: UserId } = req.user;

    try {
        const comment = await Comments.findOne({ where: { FilmId, UserId } });
        if (comment) {
            res.status(200).json({
                ok: true,
                comment
            });
        } else {
            res.status(400).json({ ok: false });
        }
        
    } catch (error) {
        res.status(500).json({ ok: false });
    }
}

/**
 * 
 * @param {*} req request
 * @param {*} res response
 * 
 * Add a comment to the database, given the film id it belongs to. The user id who is posting it will be taken from the request, after login token verification
 * An user can post only one comment for each film
 */
const addComment = async (req = request, res = response) => {

    const { descripcion, puntuacion } = req.body;
    const { id: FilmId } = req.params;
    const { id: UserId } = req.user;

    //Validar si el usuario ya ha comentado
    const yaComentado = await Comments.findOne({ where: { FilmId, UserId } });
    if (yaComentado) {
        res.status(400).json({
            msg: 'The user already has a comment for this film'
        });
    }

    const comment = new Comments({ descripcion, puntuacion, FilmId, UserId });
    const { total, comments } = await Comments.findAll({ where: { FilmId } });
    if (comments) {
        const media = (comments.map(c => c.puntuacion).reduce((a, b) => a + b) + puntuacion) / total;
        Films.update({ puntuacion_media: media }, { where: { FilmId } });
    } else {
        Films.update({ puntuacion_media: puntuacion }, { where: { FilmId } });
    }
    
    await comment.save();

    res.status(201).json(comment);
}

/**
 * 
 * @param {*} req request
 * @param {*} res response
 * 
 * Update an existing comment.
 */
const updateComment = async (req = request, res = response) => {
    const { filmId: FilmId , commId: id } = req.params;
    const { id: UserId } = req.user;
    const { descripcion, puntuacion } = req.body;
    const comment = { id, descripcion, puntuacion, UserId };
    await Comments.update( comment, { where: { id, FilmId } });

    res.status(200).json({ok: true, comment });
}

/**
 * 
 * @param {*} req request
 * @param {*} res response
 * 
 * Delete an existing comment
 */
const commentDelete = async (req = request, res = response) => {
    const { commId: id } = req.params;

    await Comments.destroy({ where: { id } });

    res.sendStatus(204);
}

module.exports = {
    allComments,
    addComment,
    updateComment,
    oneCommentGet,
    oneCommentByUserGet,
    commentDelete
}