const { Router } = require("express");
const { check } = require('express-validator');

const { allFilmsGet, newFilmPost } = require('../controllers/films.controller')


const router = Router();

router.get('/', allFilmsGet);

router.post('/', newFilmPost);

module.exports = router;