const { Router } = require("express");
const { check } = require('express-validator');

const router = Router();

const { fileUpload, fileUploadToCollection } = require('../controllers/uploads.controller');
const { validarArchivo } = require("../middlewares/validarArchivo");
const { validarCampos } = require("../middlewares/validarCampos");

router.post('/', [ validarArchivo ], fileUpload);

router.put('/:collection/:id', [
    validarArchivo,
    validarCampos
], fileUploadToCollection)

module.exports = router;