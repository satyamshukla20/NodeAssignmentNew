const express= require('express')
const userController =require('./../Controllers/userController')

const router=express.Router()

router.route('/register')
    .post(userController.signup)

router.route('/login')
    .post(userController.login)
    

module.exports=router
