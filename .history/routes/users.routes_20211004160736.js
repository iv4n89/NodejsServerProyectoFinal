const { Router } = require("express");
const { check } = require('express-validator');

const { allUsersGet, newUserPost, oneUserGet, userUpdate, userDelete } = require('../controllers/users.controller');
const { emailExists, validUserId, validRole } = require('../helpers/db.validators');
const { validarCampos } = require('../middlewares/validarCampos');
const { hasRole } = require('../middlewares/validarRole');
const { validarJWT } = require('../middlewares/validarJWT');

const router = Router();

router.get('/', allUsersGet);

router.get('/:id', [
    check('id').custom(validUserId),
    validarCampos
], oneUserGet);

router.post('/', [
    check('email', 'Email is not valid').isEmail(),
    // check('email').custom(emailExists),
    check('password', 'The password must has more than 6 characters').isLength({ min: 6 }),
    check('role').custom(validRole),
    validarCampos
], newUserPost);

router.put('/:id', [
    check('id').custom(validUserId),
    validarCampos
], userUpdate);

router.delete('/:id', [
    validarJWT,
    hasRole('ADMIN_ROLE'),
    check('id').custom(validUserId),
    validarCampos
], userDelete);

module.exports = router;