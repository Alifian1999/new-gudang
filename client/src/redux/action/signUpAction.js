import { REGISTER_REQUEST,REGISTER_SUCCESS,REGISTER_ERROR } from '../type/index'
import API from '../../API/users'


export const handleRegister=(input)=> async dispatch =>{
    try {
    dispatch(registerRequest())

    const server = await API.post(`/register`,input)
    const data = server.data
    dispatch(registerSuccess(data))
    }catch (error) {
        dispatch(registerError(error))
    }
}

const registerRequest=()=>{
    return{
        type : REGISTER_REQUEST
    }
}

const registerSuccess=(data)=>{
    return{
        type : REGISTER_SUCCESS,
        payload : data
    }
}

const registerError=(error)=>{
    return{
        type: REGISTER_ERROR,
        payload : error.message,
    }
}