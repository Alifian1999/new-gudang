const {produk,kode_produk,kode_satuan,dtl_barang,customer,return_barang,repair_barang,tmpt_barang} = require('../models')
const {query,QueryTypes} = require('sequelize')
const rawQuery = require('../models/rawQuery/raw_query')
const controller = {}
const db = require('../config/database')
const AppErrors = require('../utils/AppErrors')
//const sequelize = require('sequelize')


controller.paginationProduk = async(req,res,next) => {
    try {
        let offset = req.query.page > 0 ? req.query.page * 10 - 10 : 0;
        let nama_produk = req.query.nama_produk;

        //let page = req.query.page > 1 ? req.query.page * 10 - 10 : 0
        if(nama_produk) {
            offset = 0
        }

        const queryGetProduk = rawQuery.getListProduk(nama_produk)

        let result = await db.query(`${queryGetProduk} LIMIT 10 OFFSET ${offset}`, {
           type: QueryTypes.SELECT
        })
        
        const queryCountProduk = rawQuery.countAllProduk(nama_produk)

        let [count] = await db.query(queryCountProduk)


        console.log(count[0].count)
        page_count = Math.ceil( count[0].count / 10)
        let desc = `${req.query.page} dari ${page_count}`

        res.status(200).json({
            status: "success",
            data: result,
            total: count[0].count,
            page_count: page_count,
            desc
        })
    } catch (err) {
        next(err)
    }
}

controller.getOneProduk = async(req,res,next) => {
    try {
        const produk_id = req.params.produk_id
        const getOneProdukQuery = rawQuery.getOneProduk(produk_id)
        const [data] = await db.query(getOneProdukQuery)

        if(data.length == 0) return next(new AppErrors("Tidak Ditemukan",404))

        res.status(200).json({
            status:"success",
            data: data[0]
        })
    } catch (err) {
        next(err)
    }
}

controller.getAllKdProduk = async(req,res,next) => {
    try {
        const data = await kode_produk.findAll()
        res.status(200).json({
            status:"success",
            data
        })
    } catch (err) {
        next(err)
    }
}

controller.getAllKdSatuan = async(req,res,next) => {
    try {
        const data = await kode_satuan.findAll()
        res.status(200).json({
            status:"success",
            data
        })
    } catch (err) {
        next(err)
    }
}

controller.updateProduk = async(req,res,next) => {
    try {
        const produk_id = req.params.produk_id

        const {...newData} = req.body

        //console.log(newData)

        
        //console.log(req.file)
        
        if(!req.file){
            console.log("OMG")
            await produk.update({...newData},{
                where: {
                    id: produk_id
                }
            })
        }else {
            const imageSrc = 'http://localhost:3001/images/'+req.file.filename
            //console.log(imageSrc)
            //newData.poto_produk = imageSrc
            //console.log(newData)
            await produk.update({
                ...newData,
                poto_produk: imageSrc
            },{
                where: {
                    id: produk_id
                }
            })
        }

        const getListProduk = rawQuery.getOneProduk(produk_id)

        const [updatedData] = await db.query(getListProduk,{
            type: QueryTypes.SELECT
        })

        res.status(200).json({
            status:"success",
            data: updatedData
        })
    } catch (err) {
        next(err)
    }
}

controller.createBarangMasukKeluar = async(req,res,next) => {
    try {
        const barang = req.body
        // const filename = req.file.filename
        // console.log(filename)
        // let isExist = 1

        let [isExist] = await db.query(`
                select ( case 
                        when count(*) > 0 then true
                        else false
                        end
                        ) as isExist
                from produks 
                where nama_produk like '%${req.body.nama_produk}%'`)
        
                console.log(isExist[0].isExist)

        if(isExist[0].isExist == 0 && barang.masuk == 0) {
            return next(new AppErrors('Nama barang Tidak ada di Database', 404))
        }

        if(barang.masuk == 0){
            const [tot_produk] = await db.query(`select total_produk from produks where nama_produk like '%${barang.nama_produk}%'`)
            console.log(tot_produk[0].total_produk)
            let sum = tot_produk[0].total_produk - barang.jumlah
            console.log(sum)
            await produk.update({
                total_produk: sum
            },{
                where: {
                    nama_produk: barang.nama_produk
                }
            })


            let imageSrc = ""
            // console.log(req.file.filename)
            if(req.file){
                console.log("wow");
                imageSrc = 'http://localhost:3001/images/'+req.file.filename
            }
            
                await dtl_barang.create({
                    nama_barang: barang.nama_produk,
                    jumlah: barang.jumlah,
                    barang_masuk: false,
                    barang_keluar: true,
                    images: imageSrc
                })
            
        } else {
            if(isExist[0].isExist == 1) {
                const [tot_produk] = await db.query(`select total_produk from produks where nama_produk like '%${barang.nama_produk}%'`)
                let sum = parseInt(tot_produk[0].total_produk) + parseInt(barang.jumlah)
                console.log(sum)
                await produk.update({
                    total_produk: sum
                },{
                    where: {
                        nama_produk: barang.nama_produk
                    }
                })

                let imageSrc = ""
                console.log(req.file)
                if(req.file){
                    imageSrc = 'http://localhost:3001/images/'+req.file.filename
                }
            
                await dtl_barang.create({
                    nama_barang: barang.nama_produk,
                    jumlah: barang.jumlah,
                    barang_masuk: true,
                    barang_keluar: false,
                    images: imageSrc
                })
                
            } else {
                let imageSrc = ""
                if(req.file.filename){
                    imageSrc = 'http://localhost:3001/images/'+req.file.filename
                }
            
                await dtl_barang.create({
                    nama_barang: barang.nama_produk,
                    jumlah: barang.jumlah,
                    barang_masuk: true,
                    barang_keluar: false,
                    images: imageSrc
                })
                
            }
        }

        res.status(201).json({
            status:"success",
        })
    } catch (error) {
        next(error)
    }
}

controller.getBarangMasukKeluar = async(req,res,next) => {
    try {
        console.log("hai")
        const result = await dtl_barang.findAll()


        res.status(200).json({
            status:"success",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

controller.getCustomer = async(req,res,next) => {
    try {
        const [result] = await db.query(`
            select a.*,b.nama_produk from customers a
            inner join produks b
            on a.id_produks = b.id;
        `)

        res.status(200).json({
            status:"success",
            data:result
        })
    } catch (error) {
        next(error)
    }
}

controller.createCustomer = async(req,res,next) => {
    try {
        
        const {nama_customer,jumlah,id_produks} = req.body

        const [tot_produk] = await db.query(`select total_produk from produks where id = ${id_produks}`)

        const sum = parseInt(tot_produk[0].total_produk) - parseInt(jumlah)

        console.log(tot_produk)
        console.log(sum)

        await produk.update({
            total_produk: sum
        },{
            where: {
                id: id_produks
            }
        })

        const result = await customer.create({
                nama_customer,
                jumlah,
                id_produks
            }
        )

        res.status(201).json({
            status:"success",
            data: result
        })

    } catch (error) {
        next(error)
    }
}

controller.createReturnBarang = async(req,res,next) => {
    try {
        const {jumlah,alasan,id_produks} = req.body

        const [tot_produk] = await db.query(`select total_produk from produks where id = ${id_produks}`)

        const sum = parseInt(tot_produk[0].total_produk) + parseInt(jumlah)

        await produk.update({
            total_produk: sum
        },{
            where: {
                id: id_produks
            }
        })

        const result = await return_barang.create({
                alasan,
                jumlah,
                id_produks
            }
        )

        res.status(200).json({
            status:"success",
            data: result
        })

    } catch (error) {
        next(error)
    }
}

controller.getReturnBarang = async(req,res,next) => {
    try {
        const [result] = await db.query(`
            select a.*,b.nama_produk from return_barangs a
            inner join produks b
            on a.id_produks = b.id;
        `)

        res.status(200).json({
            status:"success",
            data:result
        })
    } catch (error) {
        next(error)
    }
}

controller.createRepaiBarang = async(req,res,next) => {
    try {
        const {jumlah,alasan,id_produks} = req.body

        const result = await repair_barang.create({
                alasan,
                jumlah,
                id_produks
            }
        )

        res.status(200).json({
            status:"success",
            data: result
        })

    } catch (error) {
        next(error)
    }
}

controller.getRepairBarang = async(req,res,next) => {
    try {
        const [result] = await db.query(`
            select a.*,b.nama_produk from repair_barangs a
            inner join produks b
            on a.id_produks = b.id;
        `)

        res.status(200).json({
            status:"success",
            data:result
        })
    } catch (error) {
        next(error)
    }
}

controller.createLokasiBarang = async(req,res,next) => {
    try {
        
        const {lokasi,id_produks} = req.body

        const result = await tmpt_barang.create({
            lokasi,
            id_produks
        })

        res.status(200).json({
            status:"success",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

controller.getLokasiBarang = async(req,res,next) => {
    try {
        const [result] = await db.query(`
            select a.*,b.nama_produk,b.poto_produk from tmpt_barangs a
            inner join produks b
            on a.id_produks = b.id;
        `)

        res.status(200).json({
            status:"success",
            data:result
        })

        
    } catch (error) {
        next(error)
    }
}

module.exports = controller