const { request, response } = require('express');
const { uploadFiles } = require('../helpers');
const path = require('path');
const fs = require('fs');

const { dbOpen } = require('../database/config.db');
const Films = dbOpen().models.Films;

const fileUpload = (req, res) => {
    uploadFiles(req.files)
        .then(result => {
            res.json({ nombre: result });
        }).catch(err => res.status(400).json({ msg: err.message }));
}

const fileUploadToFilm = (req, res) => {
    const { id, collection } = req.params;

    Films.findOne({ where: })
}

const fileUploadToUser = (req, res) => {
    const { id } = req.params;
}

module.exports = {
    fileUpload,
    fileUploadToFilm,
    fileUploadToUser
}