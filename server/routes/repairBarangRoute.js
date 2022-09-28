const express = require('express')
const router = express.Router()

const produkController = require('../controller/produkController')
const uploadFile = require('../utils/multer')

router.route('/')
.post(produkController.createReturnBarang)
.get(produkController.getReturnBarang)

module.exports = router