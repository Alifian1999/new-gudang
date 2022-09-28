const express = require('express')
const router = express.Router()

const produkController = require('../controller/produkController')
const uploadFile = require('../utils/multer')

router.route('/produk').get(produkController.paginationProduk)
router.route('/produk/:produk_id').get(produkController.getOneProduk).patch(uploadFile("poto_produk"),produkController.updateProduk)
router.route('/kd-produk').get(produkController.getAllKdProduk)
router.route('/kd-satuan').get(produkController.getAllKdSatuan)

router.route('/barang-masuk-keluar')
.post(uploadFile("poto_produk"),produkController.createBarangMasukKeluar)
.get(produkController.getBarangMasukKeluar)

module.exports = router

