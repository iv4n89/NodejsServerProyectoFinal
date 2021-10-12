const { request, response } = require('express');
const { Op } = require('sequelize');

const { dbOpen } = require('../database/config.db');
const Films = dbOpen().models.Films;

const allFilmsGet = async (req = request, res = response) => {

    const { limit = 5, offset = 0 } = req.query;

    const [total, films] = await Promise.all([
        Films.count({}),
        Films.findAll({ limit, offset })
    ]);

    res.status(200).json({
        total,
        films
    });
};

const oneFilmGet = async (req, res) => {

    const film = await Films.findOne({ where: req.params });

    res.status(200).json(film);
}

const newFilmPost = async (req = request, res = response) => {

    const { titulo, estreno, img } = req.body;
    // const { id: UserId } = req.user;
    const UserId = 1;

    const film = new Films({ titulo, estreno, img,  UserId });
    await film.save();

    res.status(201).json(film);
};

const filmUpdate = async (req = request, res = response) => {

    await Films.update(req.body, { where: req.params });

    res.sendStatus(204);
};

const filmDelete = async (req, res) => {

    await Films.destroy({ where: req.params });

    res.sendStatus(204);
};


module.exports = {
    allFilmsGet,
    oneFilmGet,
    newFilmPost,
    filmUpdate,
    filmDelete
}