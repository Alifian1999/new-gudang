import { KD_PRODUK_REQUEST,KD_PRODUK_SUCCESS,KD_PRODUK_ERROR } from '../type/index'
import API from '../../API/produk'

export const handleProduk = () => async dispatch => {
    try {
        dispatch(kdProdukRequest())

        const server = await API.get('/kd-produk')
        const data = server.data
        dispatch(kdProdukSuccess(data))
    } catch (error) {
        dispatch(kdProdukError(error))
    }
}



const kdProdukRequest = () => {
    return {
        type : KD_PRODUK_REQUEST
    }
}

const kdProdukSuccess = (data) => {
    return {
        type : KD_PRODUK_SUCCESS,
        payload : data
    }
} 

const kdProdukError = (error) => {
    return {
        type : KD_PRODUK_ERROR,
        payload : error
    }
}

