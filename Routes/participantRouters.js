const express = require('express')

const eventController = require('./../Controllers/eventController')
const userController = require('./../Controllers/userController')
const participantController = require('./../Controllers/participantController')

const router = express.Router()

router.route('/participants-registration')
    .post(participantController.registerParticipant)

router.route('/participantlist/:id')
    .get(participantController.participantlist)
    



module.exports = router