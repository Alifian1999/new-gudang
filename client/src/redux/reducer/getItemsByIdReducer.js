import { GET_ITEM_BY_ID_REQUEST,GET_ITEM_BY_ID_SUCCESS,GET_ITEM_BY_ID_ERROR } from '../type/index'

export const itemById = (state = '', action) =>{
    switch (action.type) {
        case GET_ITEM_BY_ID_REQUEST :
            return{
                ...state,
                loading : true
            }
        case GET_ITEM_BY_ID_SUCCESS :
            return{
                loading : false,
                payload : action.payload
            }
        case GET_ITEM_BY_ID_ERROR :
            return{
                loading : false,
                payload : action.payload
            }
    
        default:
            return state;
    }
}