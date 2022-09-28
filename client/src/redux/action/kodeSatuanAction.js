import { KD_SATUAN_REQUEST,KD_SATUAN_SUCCESS,KD_SATUAN_ERROR } from '../type/index'
import API from '../../API/produk'

export const handleSatuan = () => async dispatch => {
    try {
        dispatch(kdSatuanRequest())

        const server = await API.get('/kd-satuan')
        const data = server.data
        dispatch(kdSatuanSuccess(data))
    } catch (error) {
        dispatch(kdSatuanError(error))
    }
}


const kdSatuanRequest = () => {
    return {
        type : KD_SATUAN_REQUEST,
    }
}

const kdSatuanSuccess = (data) => {
    return {
        type : KD_SATUAN_SUCCESS,
        payload : data
    }
}

const kdSatuanError = (error) => {
    return {
        type : KD_SATUAN_ERROR,
        payload : error

    }
} 