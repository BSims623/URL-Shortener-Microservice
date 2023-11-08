const express = require('express')
const { postUrl, getUrl } = require('../controllers/urls')

const router = express.Router()

router.route('/').post(postUrl)
router.route('/:short_url').get(getUrl)

module.exports = router