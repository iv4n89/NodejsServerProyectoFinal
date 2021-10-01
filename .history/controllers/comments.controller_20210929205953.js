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

    const { id } = req.params.id;
    console.log(id);

    Comments.create(req.body, { include: id})
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({ msg: error.message });
        })
}

module.exports = {
    allComments,
    addComment
}