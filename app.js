const express = require('express')
const eventRouter = require('./Routes/eventRouters')
const userRouter = require('./Routes/userRouters')
const CustomError = require('./Utils/customError')
const globalErrorHandler = require('./Controllers/errorController')
const participantRouter=require('./Routes/participantRouters')

const app = express()

app.use(express.json())

app.use('/api/v1/events', eventRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/participants',participantRouter);

app.all('*',(req,res,next)=>{
    const err=new CustomError(`Cannot find the ${req.originalUrl} on the server`,404)
    next(err)
})

app.use(globalErrorHandler);

module.exports = app