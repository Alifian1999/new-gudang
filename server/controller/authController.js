const {user} = require('../models')
const AppErrors = require('../utils/AppErrors')
let controller = {}

controller.registerUser = async(req,res,next) => {
    try {
        const {username,email,password} = req.body
        //let doesExist = []

        if(!username || !email || !password) {
            return next(new AppErrors('Mohon Isi Email, Username, dan Password', 400))
        }

        //check if user already register
        const doesExist = await user.findOne({
            where: {
                email: email
            },
            logging: false,
            raw: true
        })

        //console.log(doesExist)

        if(doesExist != null){
            return next(new AppErrors('Email Sudah Terdaftar, Mohon Gunakan Email Yang Lain', 409))
        }

        const data = await user.create({
            username,
            email,
            password,
            
        },{logging: false})

        console.log(">>>>")

        res.status(201).json({
            status:"success",
            data: {
                user: {
                    username: data.username,
                    email: data.email
                }
            }
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

controller.loginUser = async(req,res,next) => {
    try {
        const {email,password} = req.body

        const doesExist = await user.findOne({
            where: {
                email
            },
            raw: true
        })

        if(!doesExist) {
            return next(new AppErrors('User Tidak Ditemukan',404))
        }

        if(password !== doesExist.password) {
            return next(new AppErrors('Password Salah',412))
        }

        res.status(200).json({
            status:"success",
            data:{
                username:doesExist.username,
                email:doesExist.email,
                id:doesExist.id
            }
        })
    } catch (err) {
        next(err)
    }
}

module.exports = controller