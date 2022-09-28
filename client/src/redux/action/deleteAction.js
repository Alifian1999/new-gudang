import { DELETE_REQUEST,DELETE_SUCCESS,DELETE_ERROR } from '../type'
import API from '../../API/produk'


export const handleDelete=(input)=> async dispatch=>{
    try {
        dispatch(deleteRequest())
        console.log(input);
        await API.delete()
        dispatch(deleteSuccess(input))
    } catch (error) {
        dispatch(deleteError(error))
    }
}



const deleteRequest=()=>{
    return{
        type : DELETE_REQUEST
    }
}

const deleteSuccess=(data)=>{
    return{
        type : DELETE_SUCCESS,
    }
}

const deleteError=(error)=>{
    return{
        type : DELETE_ERROR,
        payload : error
    }
}