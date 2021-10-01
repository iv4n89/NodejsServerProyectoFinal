const { Router } = require("express");
const { check } = require('express-validator');

const { allUsersGet, newUserPost, oneUserGet } = require('../controllers/users.controller');

const router = Router();

router.route('/')
    .get(allUsersGet)
    .post(newUserPost);

router.route('/:id')
    .get(oneUserGet)
    .put()
    .delete();


module.exports = router;