const express = require('express')

const eventController = require('./../Controllers/eventController')
const userController = require('./../Controllers/userController')

const router = express.Router()

router.route('/:id')
    .get(eventController.getEvent)

router.route('/')
    .get(eventController.getAllEvent)

router.route('/register-event')
    .post(userController.protect, userController.permission('Admin', 'Organiser'), eventController.createEvent)

router.route('/update-event/:id')
    .put(userController.protect, userController.permission('Admin', 'Organiser'), eventController.updateEvent)

router.route('/delete-event/:id')
    .delete(userController.protect, userController.permission('Admin'), eventController.deleteEvent)





module.exports = router