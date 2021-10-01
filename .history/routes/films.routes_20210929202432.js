const { Router } = require("express");
const { check } = require('express-validator');

const { allFilmsGet, newFilmPost, filmUpdate, oneFilmGet, filmDelete } = require('../controllers/films.controller')


const router = Router();

router.route('/')
    .get(allFilmsGet)
    .post(newFilmPost);

router.route('/:id')
    .get(oneFilmGet)
    .put(filmUpdate)
    .delete(filmDelete);

module.exports = router;