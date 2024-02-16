const dotenv = require('dotenv')
dotenv.config({ path: './../.env' })
const User = require('./../Models/userModel')
const jwt = require('jsonwebtoken')
const util = require('util')
const CustomError = require('./../Utils/customError')
const Roles = require('./../Models/roleModel')


exports.signup = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json({
            status: 'success',
            data: {
                user: user
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 'fail',
            message: error
        })

    }
}

exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({
            status: 'fail',
            message: "Email or password is missing."
        })
    }

    const user = await User.findOne({ email: email }).select('+password')

    if (!user || !(await user.comparePasswordInDb(password, user.password))) {
        return res.status(400).json({
            status: 'fail',
            message: "email or password incorrect"
        })
    }

    const token = jwt.sign({
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile
    }, process.env.SECRET_STR, { expiresIn: process.env.LOGIN_EXP })

    res.status(200).json({
        status: 'success',
        token: token,
        user: user
    })
}

exports.protect = async (req, res, next) => {
    const testToken = req.headers.authorization;
    let token;
    if (testToken && testToken.startsWith('bearer')) {
        token = testToken.split(' ')[1]
    }
    if (!token) {
        next(new CustomError("You are not logged in", 401))
    }

    const decodedToken = await util.promisify(jwt.verify)(token, process.env.SECRET_STR)

    //To check if user exists or not or is it deleted.
    const user = await User.findById(decodedToken.id)
    if (!user) {
        const error = new Error('The user with the given token does not exist', 401)
        next(error)
    }

    req.user = user;
    next();
}

exports.permission = (...role) => {
    return async (req, res, next) => {
        const userRoleId = await Roles.findById(req.user.roleId)
        const userType=userRoleId.type
        console.log(userType)
        if (!role.includes(userRoleId.type)) {
            const error = new Error('You dont have the permission', 401);
            next(error);
        }
        next();
    }
}