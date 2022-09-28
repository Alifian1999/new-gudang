const AppError = require('./../utils/AppErrors')

const sendErroDev = (err, res) => {
    //console.log(err)
    res.status(err.statusCode).json({
        status: err.status,
        err: err,
        message: err.message,
        stack: err.stack,
    })
}

module.exports = ((err, req, res, next) => {

    //err.stack is give you where the error happen
    //console.log(err.stack)
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'

    sendErroDev(err,res)

})