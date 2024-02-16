const Roles = require('./../Models/roleModel')

exports.registerRole = async (req, res, next) => {
    try {
        const existingRole = await Roles.findOne({ type: req.body.type })
        if (existingRole!=null &&  (existingRole.type == 'Admin' || existingRole.type == 'Organiser')) {
            const err = new CustomError('the given role already exist', 404)
            return next(err)
        }
        const role = await Roles.create(req.body)
        res.status(201).json({
            status: 'success',
            Message: "Role created successfully",
            data: {
                role: role
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        })
    }
}