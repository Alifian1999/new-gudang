import { LOGIN_REQUEST,LOGIN_ERROR,LOGIN_SUCCESS } from "../type";
import API from '../../API/users'


export const actionLoginHandler=(input)=> async dispatch=>{
    try {
        dispatch(loginRequest())

       let server= await API.post('/login',input)
       let data =server.data.data.username
       const user = data

        dispatch(loginSuccess(user))

        localStorage.setItem('user',user)
        window.location.href='/'
    } catch (error) {
        dispatch(loginError(error))
    }
}



const loginRequest=()=>{
    return{
        type : LOGIN_REQUEST,
    }
}

const loginSuccess=(data)=>{
    return{
        type:LOGIN_SUCCESS,
        payload : data,
        success:true
    }
}

const loginError=(error)=>{
    return{
        type:LOGIN_ERROR,
        payload : error.message,
        error:true
    }
}

