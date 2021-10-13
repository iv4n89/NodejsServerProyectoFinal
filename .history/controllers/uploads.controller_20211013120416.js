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

const fileUploadToCollection = (req, res) => {
    const { id, collection } = req.params
}

module.exports = {
    fileUpload,
    fileUploadToCollection
}