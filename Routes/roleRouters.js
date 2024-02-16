const express = require('express')
const roleController = require('./../Controllers/roleController')

const router = express.Router()

router.route('/')
    .post(roleController.registerRole)

module.exports = router