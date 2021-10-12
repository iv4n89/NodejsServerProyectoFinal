const { request, response } = require('express');
const { Op } = require('sequelize');

const { dbOpen } = require('../database/config.db');
const Films = dbOpen().models.Films;
const Comments = dbOpen().models.Comments;

// const allFilmsGet = async (req = request, res = response) => {

//     const { limit = 5, offset = 0, contains = "", year = 0 } = req.query;

//     const [total, films] = await Promise.all([
//         Films.count({
//             where: {
//                 titulo: {
//                     [Op.substring]: contains
//                 },
//                 estreno: {
//                     [Op.gte]: year
//                 }
//         }}),
//         Films.findAll({
//             limit, offset, where: {
//                 titulo: {
//                 [Op.substring]: contains
//                 },
//                 estreno: {
//                     [Op.gte]: year
//                 }
//         } })
//     ]);

//     res.status(200).json({
//         total,
//         films
//     });
// };

const allFilmsGet = (req, res) => {
    const { limit = 5, offset = 0, contains = "", year = 0 } = req.query;
    const options = { where: { titulo: { [Op.substring]: contains }, estreno: { [Op.gte]: year } } };
    Promise.all([
        Films.count(options),
        Films.findAll({ limit, offset, options })
    ]).then(result => {
        res.status(200).json({total: result[0], films: result[1]})
    }).catch(err => res.status(400).json({ msg: err.error.message }));
}

// const oneFilmGet = async (req, res) => {

//     const film = await Films.findOne({ where: req.params });

//     res.status(200).json(film);
// }

const oneFilmGet = (req, res) => {
    Films.findOne({ where: req.params })
        .then(result => {
            res.status(200).json(result);
        }).catch(err => response.status(400).json({ msg: err.error.message }));
}

// const newFilmPost = async (req = request, res = response) => {

//     const { titulo, estreno, img, UserId } = req.body;

//     const film = new Films({ titulo, estreno, img,  UserId });

//     await film.save();

//     res.status(201).json(film);
// };

const newFilmPost = (req, res) => {
    const { titulo, estreno, img } = req.body;
    const { id: UserId } = req.user;
    Films.create({ titulo, estreno, img, UserId })
        .then(result => {
            res.status(201).json(result)
        }).catch(err => res.status(400).json({ msg: err.error.message }));
}

// const filmUpdate = async (req = request, res = response) => {

//     await Films.update(req.body, { where: req.params });

//     res.sendStatus(204);
// };

const filmUpdate = (req, res) => {
    Films.update(req.body, { where: req.params })
        .then(result => {
            res.sendStatus(204);
        }).catch(err => res.status(400).json({ msg: err.error.message }));
}

// const filmDelete = async (req, res) => {
//     try {
//         await Comments.destroy({ where: { FilmId: req.params.id } });
//         await Films.destroy({ where: req.params });
//         res.sendStatus(204);
//     } catch (error) {
//         res.status(500).json({msg: 'Talk to the admin'})
//     }
// };

const filmDelete = (req, res) => {
    Comments.destroy({ where: { FilmId: req.params.id } })
        .then(result => result)
        .catch(err => { throw err });
    
    Films.destroy({ where: req.params })
        .then(result => {
            res.sendStatus(204);
        }).catch(err => res.status(400).json({ msg: err.error.message }));
}


module.exports = {
    allFilmsGet,
    oneFilmGet,
    newFilmPost,
    filmUpdate,
    filmDelete
}