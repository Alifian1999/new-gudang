process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log(err.stack)
    console.log('UNCAUGHT EXCEPTION! Shutting down..');
    process.exit(1);
})

const app =require('./app')

const PORT = process.env.PORT || 3001

const server = app.listen(PORT, ()=> console.log(`App running on port ${PORT}`))

process.on('unhandledRejection', (err)=> {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION! Shutting down..');
    server.close(()=>{
        process.exit(1);
    })
})