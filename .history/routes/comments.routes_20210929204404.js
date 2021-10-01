const { Router } = require("express");
const { check } = require('express-validator');

const {addComment, allComments} = require('../controllers/comments.controller')

const router = Router();

router.route('/film/:id')
    .get(allComments)
    .post(addComment);





module.exports = router;