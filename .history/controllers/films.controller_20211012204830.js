const { request, response } = require('express');
const { Op } = require('sequelize');

const { dbOpen } = require('../database/config.db');
const Films = dbOpen().models.Films;
const Comments = dbOpen().models.Comments;


const allFilmsGet = (req, res) => {
    const { limit = 5, offset = 0, contains = "", genero = "", duracion = 0, puntuacion = 0, year = 0, order = "createdAt-DESC" } = req.query;
    const options = { titulo: { [Op.substring]: contains }, estreno: { [Op.gte]: year }, genero: { [Op.substring]: genero }, puntuacion_media: {[Op.gte]: puntuacion}, duracion: {[Op.gte]: duracion} };
    const query_order = order.split("-");
    const orderQ = [query_order[0], query_order[1]];
    Promise.all([
        Films.count({ where: options }),
        Films.findAll({ where: options, order: [orderQ], limit, offset })
    ]).then(async ([total, films]) => {
        res.status(200).json({total, films})
    }).catch(err => res.status(400).json({ msg: err.message }));
}

const oneFilmGet = (req, res) => {
    Films.findOne({ where: req.params })
        .then(result => {
            res.status(200).json(result);
        }).catch(err => response.status(400).json({ msg: err.message }));
}

const newFilmPost = (req, res) => {
    const { titulo, estreno, img, genero, duracion } = req.body;
    const { id: UserId } = req.user;
    Films.create({ titulo, estreno, img, UserId, genero, duracion })
        .then(result => {
            res.status(201).json(result)
        }).catch(err => res.status(400).json({ msg: err.message }));
}

const filmUpdate = (req, res) => {
    Films.update(req.body, { where: req.params })
        .then(result => {
            res.sendStatus(204);
        }).catch(err => res.status(400).json({ msg: err.message }));
}

const filmDelete = (req, res) => {
    Comments.destroy({ where: { FilmId: req.params.id } })
        .then(result => result)
        .catch(err => { throw err });

    Films.destroy({ where: req.params })
        .then(result => {
            res.sendStatus(204);
        }).catch(err => res.status(400).json({ msg: err.message }));
}

const filmImageUpload = (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No files were uploaded.' });
        return;
    }

    console.log('req.files >>> ', req.files);

    const { archivo } = req.files;

    uploadPath = __dirname + '/image/' + sampleFile.name;

    sampleFile.mv(uploadPath, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('File uploaded to ' + uploadPath);
    });
}

module.exports = {
    allFilmsGet,
    filmDelete,
    filmImageUpload,
    filmUpdate,
    newFilmPost,
    oneFilmGet,
}