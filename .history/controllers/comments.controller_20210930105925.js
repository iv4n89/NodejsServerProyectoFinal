const { request, response } = require('express');
const { dbOpen } = require('../database/config.db');
const Comments = dbOpen().models.Comments;

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

const oneCommentGet = async (req = request, res = response) => {

    const { filmId: FilmId, commId: id } = req.params;

    const comment = await Comments.findOne({ where: { id, FilmId } });

    res.status(200).json({
        comment
    });
}

const addComment = async (req = request, res = response) => {

    const { descripcion, puntuacion } = req.body;
    const { id } = req.params;
    const user = req.user;

    const comment = new Comments({ descripcion, puntuacion, FilmId: id, UserId: user.id });

    await comment.save();

    res.status(201).json(comment);
}

const updateComment = async (req = request, res = response) => {
    const { filmId: FilmId , commId: id } = req.params;
    
    const comment = await Comments.update(req.body, { where: { id, FilmId } });
    
    res.sendStatus(204);
}

const commentDelete = async (req = request, res = response) => {
    const { commId: id } = req.params;

    await Comments.destoy({ where: { id } });

    res.sendStatus(204);
}

module.exports = {
    allComments,
    addComment,
    updateComment,
    oneCommentGet,
    commentDelete
}