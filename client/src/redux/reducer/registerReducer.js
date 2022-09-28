import {REGISTER_REQUEST,REGISTER_SUCCESS,REGISTER_ERROR } from '../type/index'


const initialState ={
    username : '',
    password : '',
    email : ''
}
export const registerReducer=(state=initialState, action)=>{
    switch (action.type) {
        case REGISTER_REQUEST:
            return{
                ...state,
                loading : true
            }
        case REGISTER_SUCCESS :
            return{
                loading : false,
                payload : action.payload,
                status : 'success'
            }
        case REGISTER_ERROR :
            return{
                loading : false,
                payload : action.payload,
                status : true
            }

        default:
            return state
    }
}