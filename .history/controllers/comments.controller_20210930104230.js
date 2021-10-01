const { request, response } = require('express');
const { dbOpen } = require('../database/config.db');
const Comments = dbOpen().models.Comments;

const allComments = (req = request, res = response) => {

    const { limit = 5, offset = 0 } = req.query;

    Comments.findAll({ where: { FilmId: req.params.id }, limit, offset })
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({ msg: error.message });
        });
}

const oneCommentGet = (req = request, res = response) => {

    const { filmId, commId } = req.params;

    Comments.findOne({ where: { id: commId, FilmId: filmId } })
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({ msg: error.message });
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

const updateComment = (req = request, res = response) => {
    const { filmId, commId } = req.params;
    const updatedComment = { ...req.body, filmId }
    
    Comments.update(req.body, { where: {id: commId, FilmId: filmId} })
        .then(result => res.sendStatus(204))
        .catch(error => {
            res.status(412).json({ msg: error.message });
        });
}

const commentDelete = (req = request, res = response) => {
    const { filmId, commId } = req.params;

    Comments.destroy({ where: { id: commId } })
        .then(result => res.sendStatus(204))
        .catch(error => {
            res.status(412).json({ msg: error.message });
        });
}

module.exports = {
    allComments,
    addComment,
    updateComment,
    oneCommentGet,
    commentDelete
}