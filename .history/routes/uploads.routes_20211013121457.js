const { Router } = require("express");
const { check } = require('express-validator');

const router = Router();

const { fileUpload, fileUploadToFilm, fileUploadToUser } = require('../controllers/uploads.controller');
const { validarArchivo } = require("../middlewares/validarArchivo");
const { validarCampos } = require("../middlewares/validarCampos");

router.post('/', [ validarArchivo ], fileUpload);

router.put('/films/:id', [
    validarArchivo,
    validarCampos
], fileUploadToFilm);

router.put('/users/:id', [
    validarArchivo,
    validarCampos
], fileUploadToUser)

module.exports = router;