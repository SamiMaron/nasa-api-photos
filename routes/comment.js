var express = require('express');
var router = express.Router();
const controller = require('../luncher/comments')

router.get('/fetchComments',controller.fetchComments);
router.post('/updateComments',controller.updateComments);


module.exports = router;
