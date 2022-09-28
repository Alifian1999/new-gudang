const fs = require("fs")
const {produk,kode_satuan,kode_produk} = require("../models")

const produks = JSON.parse(fs.readFileSync(`${__dirname}/produk.json`, 'utf-8'))
const kd_produk = JSON.parse(fs.readFileSync(`${__dirname}/kd_produk.json`, 'utf-8'))
const kd_satuan = JSON.parse(fs.readFileSync(`${__dirname}/kd_satuan.json`, 'utf-8'))

const ImportData = async()=>{
    try {
        //console.log(produks)
        await kode_produk.bulkCreate(kd_produk)
        await kode_satuan.bulkCreate(kd_satuan)
        //await produk.bulkCreate(produks)
        console.log("SUKSES MIGRATE")
    } catch (err) {
        console.log(err)
    }
    process.exit()
}

console.log(process.argv)
if(process.argv[2] === '--import'){
    ImportData()
}
if(process.argv[2] === '---ok'){
    console.log("nihao")
}