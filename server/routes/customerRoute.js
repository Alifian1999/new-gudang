const express = require('express')
const router = express.Router()

const produkController = require('../controller/produkController')
const uploadFile = require('../utils/multer')

router.route('/')
.post(uploadFile("poto_produk"),produkController.createCustomer)
.get(produkController.getCustomer)

module.exports = router

