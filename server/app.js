const express = require("express")
const morgan = require('morgan')
const cors = require('cors')

const app = express()

//Dev Log
app.use(morgan('dev'))

//Body Parser
app.use(express.json())
app.use(cors())
//Serving Static File
app.use(express.static(`${__dirname}/public`))

// app.use((req,res,next)=>{
//     req.requesTime = new Date().toISOString();

//     next()
// })

const AppError = require('./utils/AppErrors')
const globalErrorHandler = require('./controller/errorController')
const userRouter = require('./routes/userRoutes')
const produkRouter = require('./routes/produkRoutes')
const dtl_barang = require('./routes/dtlBarangRoutes')
const customerRouter = require('./routes/customerRoute')
const returnBarangRouter = require('./routes/returnBarangRoutes')
const repairBarangRouter = require('./routes/repairBarangRoute')
const tmptBarangRouter = require('./routes/tmptBarangRoutes')

app.use("/api/v1/users", userRouter)
app.use("/api/v1/produks", produkRouter)
app.use("/api/v1/dtl-barang", dtl_barang)
app.use("/api/v1/customer", customerRouter)
app.use("/api/v1/return-barang", returnBarangRouter)
app.use("/api/v1/repair-barang", repairBarangRouter)
app.use("/api/v1/tmpt-barang", tmptBarangRouter)

app.all('*', (req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on the server`, 404))
})

app.use(globalErrorHandler)

module.exports = app