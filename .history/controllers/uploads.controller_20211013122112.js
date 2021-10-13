const { request, response } = require('express');
const { uploadFiles } = require('../helpers');
const path = require('path');
const fs = require('fs');

const { dbOpen } = require('../database/config.db');
const Films = dbOpen().models.Films;
const Users = dbOpen().models.Users;

const fileUpload = (req, res) => {
    uploadFiles(req.files)
        .then(result => {
            res.json({ nombre: result });
        }).catch(err => res.status(400).json({ msg: err.message }));
}

const fileUploadToFilm = (req, res) => {
    const { id } = req.params;

    Films.findOne({ where: { id } })
        .then(film => {
            if (film) {
                uploadFiles(req.files, undefined, 'Films').then(file => {
                    if (film.img) {
                        const pathImg = path.join(__dirname, '../uploads', 'Films', film.img);
                        if (fs.existsSync(pathImg)) {
                            fs.unlinkSync(pathImg);
                        }
                    }
                    Films.update({ img: file }, { where: { id } })
                        .then(result => {
                            res.sendStatus(204);
                        }).catch(err => res.status(400).json({ msg: err.message }));
                }).catch(err => res.status(400).json({ msg: err.message }));
            }
        }).catch(err => res.status(400).json({ msg: err.message }));
}

const fileUploadToUser = (req, res) => {
    const { id } = req.params;

    Users.findOne({ where: { id } })
        .then(user => {
            if (user) {
                uploadFiles(req.files, undefined, 'Films').then(file => {
                    if (user.img) {
                        const pathImg = path.join(__dirname, '../uploads', 'Films', user.img);
                        if (fs.existsSync(pathImg)) {
                            fs.unlinkSync(pathImg);
                        }
                    }
                    Users.update({ img: file }, { where: { id } })
                        .then(result => {
                            res.sendStatus(204);
                        }).catch(err => res.status(400).json({ msg: err.message }));
                }).catch(err => res.status(400).json({ msg: err.message }));
            }
        }).catch(err => res.status(400).json({ msg: err.message }));
}

const filmImageGet = (req, res) => {

}

module.exports = {
    fileUpload,
    fileUploadToFilm,
    fileUploadToUser,
    filmImageGet
}