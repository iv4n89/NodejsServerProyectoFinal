const { request, response } = require('express');
const { dbOpen } = require('../database/config.db');
const Comments = dbOpen().models.Comments;

const allComments = (req = request, res = response) => {
    Comments.findAll({ where: { FilmId: req.params } })
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({ msg: error.message });
        });
}

const addComment = (req = request, res = response) => {

    const { FilmId } = req.params;
    const newComment = { ...req.body };
    console.log(JSON.stringify(newComment));

    Comments.create(newComment, { include: FilmId})
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({ msg: error.message });
        })
}

module.exports = {
    allComments,
    addComment
}