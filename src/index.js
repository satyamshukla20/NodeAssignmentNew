
const dotenv = require('dotenv')
dotenv.config({ path: './../.env' })

const express = require('express')
const mongoose = require('mongoose')

const app = require('./../app.js')

mongoose.connect(process.env.LOCAL_CONN_STR, {
    useNewUrlParser: true
}).then((conn) => console.log('DB connection successfull'))
    .catch((error) => { console.log(error) })



app.listen(process.env.PORT, (req, res) => {
    console.log("server has started!!!")
})

