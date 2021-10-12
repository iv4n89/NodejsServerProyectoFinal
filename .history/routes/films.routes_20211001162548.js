const { Router } = require("express");
const { check } = require('express-validator');

const { allFilmsGet, newFilmPost, filmUpdate, oneFilmGet, filmDelete } = require('../controllers/films.controller');
const { filmIdExiste } = require('../helpers/db.validators');
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validarJWT");
const { hasRole } = require("../middlewares/validarRole");


const router = Router();

router.get('/', allFilmsGet);

router.get('/:id', [
    check('id').custom(filmIdExiste),
    validarCampos
], oneFilmGet);

router.post('/', [
    // validarJWT,
    check('titulo', 'The title is required').not().isEmpty(),
    check('estreno').not().isEmpty(),
    check('estreno', 'The year is not valid').isNumeric(),
    // hasRole('ADMIN_ROLE'),
    validarCampos
], newFilmPost);

router.put('/:id', [
    // validarJWT,
    check('titulo', 'The title is required').not().isEmpty(),
    check('estreno').not().isEmpty(),
    check('estreno', 'The year is not valid').isNumeric(),
    // hasRole('ADMIN_ROLE'),
    validarCampos
], filmUpdate);

router.delete('/:id', [
    // validarJWT,
    check('titulo', 'The title is required').not().isEmpty(),
    check('estreno').not().isEmpty(),
    check('estreno', 'The year is not valid').isNumeric(),
    // hasRole('ADMIN_ROLE'),
    validarCampos
], filmDelete);

module.exports = router;