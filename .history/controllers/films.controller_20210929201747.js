const { request, response } = require('express');
const { dbOpen } = require('../database/config.db');
const Films = dbOpen().models.Films;

const allFilmsGet = (req = request, res = response) => {

    Films.findAll({})
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
        .then(result => res.sendStatus(204).json(result))
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });

}


module.exports = {
    allFilmsGet,
    oneFilmGet,
    newFilmPost,
    filmUpdate
}