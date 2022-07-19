const express = require('express')

const controller = require('../controller/blogController')

const router = express.Router()

router.get('/',controller.blogs)
router.get('/:id',controller.blogs_view)
router.post('/:id',controller.post_comment)

module.exports = router