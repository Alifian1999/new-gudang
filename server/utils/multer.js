const multer = require("multer");
const AppErrors = require('../utils/AppErrors')

const uploadFile = (imageFile) => {
    //make destination file for upload
    const storage = multer.diskStorage({
        destination: function(req,file,cb) {
            cb(null, "images") //file storage destination
        },
        filename: function(req,file,cb) {
            cb(null, file.originalname.replace(/\s/g,"-"))
        }
    })

    // file filter based on extension file
    const fileFilter = function(req, file, cb){
        if(file.fieldname === imageFile){
            if(!file.originalname.match(/\.(jpg|JPG|JPEG|png|PNG)$/)){
                req.fileValidationError = {
                    message: "Only Image file Allowed"
                }
                return cb (new Error("Only Image file Allowed"), false)
            }
        }
        cb(null,true)
    }

    //Generate settning multer
    const upload = multer({
        storage,
        fileFilter
    }).single(imageFile)

    //middleware handler
    return (req,res,next) => {
        upload(req,res, (err)=>{
            try {
                //show an error if validation error
            if(req.fileValidationError){
                return next(new AppErrors(req.fileValidationError,415));
            }

            //show an error if file doesnt provided requirement
            // if(!req.file){
            //     throw createError.UnprocessableEntity("Please select file to upload")
            // }
            
            //if there is no error
            return next()

            } catch (err) {
                console.log(err);
                next(err)
            }
            
        })
    }
}

module.exports = uploadFile;