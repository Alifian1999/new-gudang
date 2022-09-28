import { LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_ERROR } from "../type";

export const signInReducer=(state='', action)=>{
    switch(action.type){
        case LOGIN_REQUEST:
            return{
                loading:true
            }
        case LOGIN_SUCCESS:
            return{
                payload : action.payload,
                success : action.success
            }
        case LOGIN_ERROR:
            return{
                payload : action.payload,
                error : action.error
            }
        default:
            return state
    }
}