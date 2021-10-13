const { Router } = require("express");
const { check } = require('express-validator');

const router = Router();

const { fileUpload } = require('../controllers/uploads.controller')

router.post('/', [], fileUpload);



module.exports = router;