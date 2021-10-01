const { Router } = require("express");
const { check } = require('express-validator');

const {addComment, allComments, updateComment} = require('../controllers/comments.controller')

const router = Router();

router.route('/film/:id')
    .get(allComments)
    .post(addComment);

router.route('/film/:filmId/:commId')
    .put(updateComment);




module.exports = router;