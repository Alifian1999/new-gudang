import { REQUEST_GET_BARANG, SUCCESS_GET_BARANG,ERROR_GET_BARANG } from '../type'
import API from '../../API/produk'

export const getBarang=(input)=> async dispatch =>{
    try {
        dispatch(requestBarang())
        const page = input
        const data = await API.get(`produk?page=${page}&nama_produk`)
        const pagination = await data.data
        dispatch(successBarang(pagination))
    } catch (error) {
        dispatch(errorBarang(error))
    }
}


const requestBarang=()=>{
    return{
        type : REQUEST_GET_BARANG
    }
}

const successBarang=(data)=>{
    return{
        type : SUCCESS_GET_BARANG,
        payload : data
    }
}

const errorBarang=(error)=>{
    return{
        type : ERROR_GET_BARANG,
        payload : error
    }
}