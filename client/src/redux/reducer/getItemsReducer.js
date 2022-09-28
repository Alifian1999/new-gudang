import { REQUEST_GET_BARANG, SUCCESS_GET_BARANG,ERROR_GET_BARANG } from '../type'

const initialState = {
    data:[],
    loading : true
}
export const getItemsReducer = (state = initialState, action) =>{
    switch (action.type) {
        case REQUEST_GET_BARANG:
            return{
                status : 'loading',
                state
            }
        case SUCCESS_GET_BARANG:
            return{
                status : 'success',
                payload : action.payload
            }
        case ERROR_GET_BARANG:
            return{
                status : 'error',
                payload : action.payload
            }
        default:
            return state
    }
}