const { Router } = require("express");
const { check } = require('express-validator');

const { validarCampos } = require("../middlewares/validarCampos");
const { login, renewToken } = require('../controllers/auth.controller');
const { validarJWT } = require("../middlewares/validarJWT");

const router = Router();

router.post('/login', [
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validarCampos
], login);

router.get('/renew', validarJWT, renewToken);




module.exports = router;