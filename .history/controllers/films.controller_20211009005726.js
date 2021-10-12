const { request, response } = require('express');
const { Op } = require('sequelize');

const { dbOpen } = require('../database/config.db');
const Films = dbOpen().models.Films;
const Comments = dbOpen().models.Comments;

const allFilmsGet = async (req = request, res = response) => {

    const { limit = 5, offset = 0, contains = "", year = 0 } = req.query;

    const [total, films] = await Promise.all([
        Films.count({
            where: {
                titulo: {
                    [Op.substring]: contains
                },
                estreno: {
                    [Op.gte]: year
                }
        }}),
        Films.findAll({
            limit, offset, where: {
                titulo: {
                [Op.substring]: contains
                },
                estreno: {
                    [Op.gte]: year
                }
        } })
    ]);

    res.status(200).json({
        total,
        films
    });
};

// const oneFilmGet = async (req, res) => {

//     const film = await Films.findOne({ where: req.params });

//     res.status(200).json(film);
// }

const oneFilmGet = (req, res) => {
    Films.findOne({ where: req.params })
        .then(response => {
            res.status(200).json(response);
        }).catch(err => response.status(400).json({ msg: err.error.msg }));
}

const newFilmPost = async (req = request, res = response) => {

    const { titulo, estreno, img, UserId } = req.body;

    const film = new Films({ titulo, estreno, img,  UserId });

    await film.save();

    res.status(201).json(film);
};

const filmUpdate = async (req = request, res = response) => {

    await Films.update(req.body, { where: req.params });

    res.sendStatus(204);
};

const filmDelete = async (req, res) => {
    console.log(req.params);
    try {
        await Comments.destroy({ where: { FilmId: req.params.id } });
        await Films.destroy({ where: req.params });
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({msg: 'Talk to the admin'})
    }
};


module.exports = {
    allFilmsGet,
    oneFilmGet,
    newFilmPost,
    filmUpdate,
    filmDelete
}