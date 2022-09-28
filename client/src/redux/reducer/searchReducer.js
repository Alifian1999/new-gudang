import { SEARCH_REQUEST,SEARCH_SUCCESS,SEARCH_ERROR } from '../type'

export const searchReducer=(state='', action)=>{
    switch (action.type) {
        case SEARCH_REQUEST :
            return{
                state,
                loading : true,
            }
        case SEARCH_SUCCESS :
            return{
                loading : false,
                payload : action.payload,
                searching : true
            }
        case SEARCH_ERROR :
            return{
                loading : false,
                payload : action.payload,
                searching : false
            }

        default:
            return state
    }
}

