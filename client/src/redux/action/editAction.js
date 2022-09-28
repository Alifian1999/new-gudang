import { EDIT_REQUEST,EDIT_SUCCESS,EDIT_ERROR } from "../type";
import API from '../../API/produk'


export const handleEdit=(input)=>async dispatch=>{
    try {
        dispatch(editRequest())
        console.log(input);
        const data = input.data
        const id = input.id
        await API.patch(`/produk/${id}`,data)
        dispatch(editSuccess(data))
    } catch (error) {
        dispatch(editError(error))
        console.log(error);
    }
}


const editRequest=()=>{
    return{
        type: EDIT_REQUEST
    }
}

const editSuccess=(data)=>{
    return{
        type: EDIT_SUCCESS,
        payload : data
    }
}

const editError=(error)=>{
    return{
        type: EDIT_ERROR,
        payload: error
    }
}