const query = {}

query.getListProduk = (nama_produk) => {
    return `select pd.id, pd.nama_produk,coalesce(kp.kd_produk, 'N/A') as kd_produk,pd.total_produk,pd.unassigned,pd.rak,ks.kd_satuan,pd.poto_produk
    from produks pd
    left join kode_produks kp
    on pd.kd_produk = kp.id
    inner join kode_satuans ks
    on pd.kd_satuan = ks.id
    where nama_produk like '%${nama_produk}%'
    order by pd.nama_produk asc 
    `
}

query.countAllProduk = (nama_produk) => {
    return `select count(*) as count
    from produks pd
    left join kode_produks kp
    on pd.kd_produk = kp.id
    inner join kode_satuans ks
    on pd.kd_satuan = ks.id
    where nama_produk like '%${nama_produk}%'
    `
}

query.getOneProduk = (id_produk) => {
    return `select pd.id, pd.nama_produk,kp.kd_produk,pd.total_produk,pd.unassigned,pd.rak,ks.kd_satuan,pd.poto_produk
    from produks pd
    left join kode_produks kp
    on pd.kd_produk = kp.id
    inner join kode_satuans ks
    on pd.kd_satuan = ks.id
    where pd.id = ${id_produk}
    `
}


module.exports = query