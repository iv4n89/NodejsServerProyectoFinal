const { Router } = require("express");
const { check } = require('express-validator');

const {addComment, allComments, updateComment, commentDelete, oneCommentGet} = require('../controllers/comments.controller');
const { userHasCommentOnFilm } = require("../helpers/db.validators");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validarJWT");
const { mismoUser } = require("../middlewares/validarMismoUser");
const { hasRole } = require("../middlewares/validarRole");
const { yaHaComentado } = require("../middlewares/validarYaHaComentado");

const router = Router();

router.get('/film/:id', allComments);

router.get('/film/:filmId/:commId', oneCommentGet);

router.post('/film/:id', [
    validarJWT,
    check('descripcion', 'The description is required').not().isEmpty(),
    check('puntuacion', 'The score is required').not().isEmpty(),
    check('puntuacion').isNumeric(),
    yaHaComentado,
    hasRole('USER_ROLE', 'ADMIN_ROLE'),
    validarCampos
], addComment);

router.put('/film/:filmId/:commId', [
    validarJWT,
    mismoUser,
    check('descripcion', 'The description is required').not().isEmpty(),
    check('puntuacion', 'The score is required').not().isEmpty(),
    check('puntuacion').isNumeric(),
    hasRole('USER_ROLE','ADMIN_ROLE'),
    validarCampos
], updateComment);

router.delete('/film/:filmId/:commId', [
    validarJWT,
    hasRole('ADMIN_ROLE'),
    validarCampos
], commentDelete);




module.exports = router;