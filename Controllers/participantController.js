const CustomError = require('./../Utils/customError')
const Participant = require('./../Models/participantModel')
const Event = require('./../Models/eventModel')

exports.registerParticipant = async (req, res, next) => {
    try {
        console.log(req.body.eventId)
        const event = await Event.findById(req.body.eventId)
        console.log(event)
        if (event===null) {
            const error = new CustomError('The event for such Id does not exist', 404)
            return next(error)
        }
        const participant = await Participant.create(req.body)
        res.status(201).json({
            status: 'success',
            Message: "participant  registered successfully",
            data: {
                participant: participant
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        })
    }
}

exports.participantlist = async (req, res, next) => {
    try {
        const participantList = await Participant.find({ eventId: req.params.id })
        res.status(200).json({
            status: 'success',
            length: participantList.length,
            Message: "participant list",
            data: {
                participantList: participantList
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        })
    }
}
