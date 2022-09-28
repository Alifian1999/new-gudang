import { GET_ITEM_BY_ID_REQUEST,GET_ITEM_BY_ID_SUCCESS,GET_ITEM_BY_ID_ERROR } from '../type/index'
import API from '../../API/produk'

export const handleItemById = (input) => async dispatch =>{
    try {
        dispatch(itemByIdRequest())
        const server = await API.get(`/produk/${input}`)
        const data = server.data
        dispatch(itemByIdSuccess(data))
    } catch (error) {
        dispatch(itemByIdError(error))
    }
}


const itemByIdRequest = () =>{
    return{
        type : GET_ITEM_BY_ID_REQUEST
    }
}

const itemByIdSuccess = (data) =>{
    return{
        type : GET_ITEM_BY_ID_SUCCESS,
        payload : data
    }
}

const itemByIdError = (error) =>{
    return{
        type : GET_ITEM_BY_ID_ERROR,
        payload : error
    }
}