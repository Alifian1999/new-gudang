const express = require('express')
const router = express.Router()

const produkController = require('../controller/produkController')
const uploadFile = require('../utils/multer')

router.route('/barang-masuk-keluar')
.post(uploadFile("poto_produk"),produkController.createBarangMasukKeluar)
.get(produkController.getBarangMasukKeluar)

module.exports = router

