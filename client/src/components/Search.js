import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { handleSearch } from "../redux/action/searchAction";
import { CForm,CFormInput,CButton } from "@coreui/bootstrap-react";



export default function Search(){
    let [value,setValue] = useState([])
    const dispatch = useDispatch()

    useEffect(()=>{
        if(value.length===0){
        dispatch(handleSearch([]))
        }
    },[value])
    
    function handleSubmitSearch(e){
        e.preventDefault()
        dispatch(handleSearch(value))
    }
    return(
        <CForm onSubmit={handleSubmitSearch} className="d-flex">
            <CFormInput onChange={e=>setValue(e.target.value)} type="search" className="me-2" placeholder="Search" ></CFormInput>
            <CButton type="submit" color="success" variant="outline">
            Search
            </CButton>
        </CForm>
    )
}