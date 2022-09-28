import { SEARCH_REQUEST,SEARCH_SUCCESS,SEARCH_ERROR } from '../type'
import API from '../../API/produk'

export const handleSearch=(input)=>async dispatch=>{
    try {
        dispatch(searchRequest())
        let search = input
        const data = await API.get(`produk?page=2&nama_produk=${search}`)
        if(input.length===0){
            dispatch(searchError())
            return
        }else{
            dispatch(searchSuccess(data))
        }

    } catch (error) {
        dispatch(searchError(error))
    }
}

const searchRequest=()=>{
    return{
        type: SEARCH_REQUEST
    }
}

const searchSuccess=(data)=>{
    return{
        type: SEARCH_SUCCESS,
        payload : data
    }
}

const searchError=(error)=>{
    return{
        type: SEARCH_ERROR,
        payload : error
    }
}

