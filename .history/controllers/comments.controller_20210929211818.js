const { request, response } = require('express');
const { dbOpen } = require('../database/config.db');
const Comments = dbOpen().models.Comments;

const allComments = (req = request, res = response) => {
    Comments.findAll({ where: { FilmId: req.params.id } })
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({ msg: error.message });
        });
}

const addComment = (req = request, res = response) => {

    const { id } = req.params;
    const newComment = {...req.body, FilmId: id};
    console.log(newComment);

    Comments.create(newComment)
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({ msg: error.message });
        })
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
    updateComment
}