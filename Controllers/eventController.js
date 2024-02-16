const Event = require('./../Models/eventModel')
const CustomError = require('./../Utils/customError')

exports.getEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id)
        if (!event) {
            const error = new CustomError('The event of this ID does not exist', 404);
            return next(error)
        }
        res.status(200).json({
            status: 'success',
            data: {
                event: event
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        })
    }
}


exports.getAllEvent = async (req, res) => {
    try {
        const event = await Event.find(req.query);
        res.status(200).json({
            status: 'success',
            length: event.length,
            data: {
                event: event
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        })
    }
}

exports.createEvent = async (req, res) => {
    try {
        console.log(req.body)
        const event = await Event.create(req.body)
        res.status(201).json({
            status: 'success',
            data: {
                event: event
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        })
    }
}

exports.updateEvent = async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        res.status(200).json({
            status: 'success',
            data: {
                event: updatedEvent
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        })
    }
}

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            message: 'successfully deleted the event',
            data: {
                event: event
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        })
    }
}

