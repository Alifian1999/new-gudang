const Sequelize = require('sequelize')

const db = new Sequelize("project_akhir","postgres","ip0369751399", {
    host: "127.0.0.1",
    dialect: "postgres",
    port: "5432",
    logging: false
})

db.authenticate()
.then(()=>{
    console.log("You are now connected to postgreSQL")
})
.catch((err)=>{
    console.log('cant connect to database', err)
})

module.exports = db