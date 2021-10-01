const { Router } = require("express");
const { check } = require('express-validator');

const { allFilmsGet, newFilmPost, filmUpdate, oneFilmGet, filmDelete } = require('../controllers/films.controller');
const { filmIdExiste } = require('../helpers/db.validators');
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validarJWT");


const router = Router();

router.get('/', allFilmsGet);

router.get('/:id', [
    check('id').custom(filmIdExiste),
    validarCampos
], oneFilmGet);

router.post('/', [
    validarJWT,
    check('titulo', 'The title is required').not().isEmpty(),
    validarCampos
], newFilmPost);

router.put('/:id', filmUpdate);

router.delete('/:id', filmDelete);

module.exports = router;