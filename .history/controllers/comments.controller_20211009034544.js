const { request, response } = require('express');
const { dbOpen } = require('../database/config.db');
const Comments = dbOpen().models.Comments;
const Films = dbOpen().models.Films;


const allComments = (req, res) => {
    const { limit = 5, offset = 0 } = req.query;
    const query = { FilmId: req.params.id };

    Promise.all([
        Comments.count({ where: query }),
        Comments.findAll({ where: query, limit, offset })
    ]).then(([total, comments]) => {
        res.status(200).json({
            total,
            comments
        })
    }).catch(err => res.status(400).json({ msg: err.message }));
}

const oneCommentGet = (req, res) => {
    const { filmId: FilmId, commId: id } = req.params;
    Comments.findOne({ where: { id, FilmId } })
        .then(result => {
            res.status(200).json({ comment: result })
        }).catch(err => res.status(400).json({ msg: err.message }));
}


const oneCommentByUserGet = (req, res) => {
    const { filmId: FilmId } = req.params;
    const { id: UserId } = req.user;

    Comments.findOne({ where: { FilmId, UserId } })
        .then(result => {
            if (result) {
                return res.status(200).json({ ok: true, comment: result });
            } else {
                res.status(400).json({ ok: false });
            }
        }).catch(err => res.status(400).json({ ok: false }));
}


const addComment = (req, res) => {
    const { descripcion, puntuacion } = req.body;
    const { id: FilmId } = req.params;
    const { id: UserId } = req.user;

    Comments.create({ descripcion, puntuacion, FilmId, UserId })
        .then(result => {
            actualizarPuntuacion(FilmId);
            res.status(201).json(result);
        }).catch(err => res.status(400).json({ msg: err.message }));
}


const updateComment = (req, res) => {
    const { filmId: FilmId , commId: id } = req.params;

    Comments.update(req.body, { where: { id, FilmId } })
        .then(result => {
            actualizarPuntuacion(FilmId);
            res.status(200).json({ ok: true });
        }).catch(err => res.status(400).json({ msg: err.message }));
}


const commentDelete = (req, res) => {
    const { commId: id, filmId: FilmId } = req.params;

    Comments.destroy({ where: { id } })
        .then(result => {
            actualizarPuntuacion(FilmId);
            res.status(200).json({ ok: true });
        }).catch(err => res.status(400).json({ msg: err.message }));
}

const actualizarPuntuacion = (filmId) => {
    Promise.all([
        Comments.count({ where: {filmId} }),
        Comments.findAll({ where: {filmId} })
    ]).then(([total, comments = []]) => {
        let media = 0;
        if (comments.length > 0) {
            media = (comments.map(c => c.puntuacion).reduce((a, b) => a + b)) / total;
        }
        Films.update({ puntuacion_media: media }, { where: { id: filmId } }).then(result => result);
    })
}

module.exports = {
    allComments,
    addComment,
    updateComment,
    oneCommentGet,
    oneCommentByUserGet,
    commentDelete
}