const { request, response } = require('express');
const { Op } = require('sequelize');

const { dbOpen } = require('../database/config.db');
const Films = dbOpen().models.Films;

const allFilmsGet = (req = request, res = response) => {

    const { limit = 5, offset = 0 } = req.query;

    Films.findAll({ offset, limit })
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
};

const oneFilmGet = (req, res) => {
    Films.findOne({ where: req.params })
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
}

const newFilmPost = (req = request, res = response) => {

    Films.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });

};

const filmUpdate = (req = request, res = response) => {

    Films.update(req.body, { where: req.params })
        .then(result => res.sendStatus(204))
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
};

const filmDelete = (req, res) => {
    Films.destroy({ where: req.params })
        .then(result => res.sendStatus(204))
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
};


module.exports = {
    allFilmsGet,
    oneFilmGet,
    newFilmPost,
    filmUpdate,
    filmDelete
}