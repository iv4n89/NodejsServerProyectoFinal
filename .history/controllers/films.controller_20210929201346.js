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

const newFilmPost = (req = request, res = response) => {

    Films.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });

};

module.exports = {
    allFilmsGet,
    newFilmPost
}