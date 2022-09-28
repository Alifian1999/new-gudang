import { KD_PRODUK_REQUEST,KD_PRODUK_SUCCESS,KD_PRODUK_ERROR } from '../type/index'
import { KD_SATUAN_REQUEST,KD_SATUAN_SUCCESS,KD_SATUAN_ERROR } from '../type/index'

export const kodeProdukReducer = (state = '', action) => {
    switch (action.type) {
        case KD_PRODUK_REQUEST : 
            return {
                state,
                loading : true
            }
        case KD_PRODUK_SUCCESS :
            return {
                loading : false,
                payload : action.payload
            }
        case KD_PRODUK_ERROR :
            return {
                loading : false,
                payload : action.payload
            }
        default:
            return state
    }
}


export const kodeSatuanReducer = (state = '' , action) => {
    switch (action.type) {
        case KD_SATUAN_REQUEST :
            return {
                state,
                loading : true
            }
        case KD_SATUAN_SUCCESS :
            return {
                loading : false,
                payload : action.payload
            }
        case KD_SATUAN_ERROR :
            return {
                loading : false,
                payload : action.payload
            }
        default:
            return state
    }
}