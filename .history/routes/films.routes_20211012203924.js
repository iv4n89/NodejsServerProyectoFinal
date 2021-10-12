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
    validarJWT,
    check('titulo', 'The title is required').not().isEmpty(),
    check('estreno').not().isEmpty(),
    check('estreno', 'The year is not valid').isNumeric(),
    hasRole('ADMIN_ROLE'),
    validarCampos
], newFilmPost);

router.post('/image', (req, res) => {
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }

    console.log('req.files >>> ', req.files);

    uploadPath = __dirname + '/image/' + sampleFile.name;

    sampleFile.mv(uploadPath, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('File uploaded to ' + uploadPath);
    });
});

router.put('/:id', [
    validarJWT,
    check('titulo', 'The title is required').not().isEmpty(),
    check('estreno').not().isEmpty(),
    check('estreno', 'The year is not valid').isNumeric(),
    hasRole('ADMIN_ROLE'),
    validarCampos
], filmUpdate);

router.delete('/:id', [
    validarJWT,
    hasRole('ADMIN_ROLE'),
    validarCampos
], filmDelete);

module.exports = router;