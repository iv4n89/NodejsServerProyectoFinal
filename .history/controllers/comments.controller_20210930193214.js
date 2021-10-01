const { request, response } = require('express');
const { dbOpen } = require('../database/config.db');
const Comments = dbOpen().models.Comments;

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

/**
 * 
 * @param {*} req request
 * @param {*} res response
 * 
 * Add a comment to the database, given the film id it belongs to. The user id who is posting it will be taken from the request, after login token verification
 */
const addComment = async (req = request, res = response) => {

    const { descripcion, puntuacion } = req.body;
    const { id: FilmId } = req.params;
    const { id: UserId } = req.user;

    //Validar si el usuario ya ha comentado
    const yaComentado = await Comments.findOne({ where: { FilmId, UserID } });
    if (yaComentado) {
        res.status(400).json({
            msg: 'The user already has a comment for this film'
        });
    }

    const comment = new Comments({ descripcion, puntuacion, FilmId, UserId });

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

    await Comments.update(req.body, { where: { id, FilmId } });

    res.sendStatus(204);
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
    commentDelete
}