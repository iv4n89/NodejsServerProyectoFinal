const { Router } = require("express");
const { check } = require('express-validator');

const { allUsersGet, newUserPost, oneUserGet, userUpdate, userDelete } = require('../controllers/users.controller');
const { emailExists } = require('../helpers/db.validators');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(emailExists),
    check('password', 'The password must has more than 6 characters').isLength({ min: 6 }),
    validarCampos
], newUserPost);

router.route('/')
    .get(allUsersGet)
    .post(newUserPost);

router.route('/:id')
    .get(oneUserGet)
    .put(userUpdate)
    .delete(userDelete);


module.exports = router;