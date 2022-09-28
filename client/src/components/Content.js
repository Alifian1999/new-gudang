import React, { useState,useEffect } from 'react'
import '../componentStyle/content.css'
import {Table} from 'react-bootstrap'
import ModalComponents from './ModalComponent'
import { useSelector,useDispatch } from 'react-redux'
import { PaginatedItems } from "./Pagination";
import SearchResult from './SearchResult'
import { handleItemById } from '../redux/action/getItemById'
import { getBarang } from '../redux/action/getItems'


export default function Content(){
    const dispatch = useDispatch()
    const selector = useSelector(state=>state.getItemsReducer)
    const selectorSearch = useSelector(state=>state.searchReducer)
    const isSearching = selectorSearch.searching
    const [modalDisplay, setModalDisplay] = useState(false)
    const [itemId,setItemId] = useState(null)

    function handleGetItemById(id){
        dispatch(handleItemById(id))
        setItemId(id)
        setModalDisplay(true)
    }

    useEffect(()=>{
        dispatch(getBarang())
    },[modalDisplay])

    if(isSearching === true){
        console.log(isSearching);
        return <SearchResult/>
    }


    return(
        <div style={{width:'100%',paddingLeft:'20px',paddingRight:'20px'}}>
            <div style={{ width:'100%',marginBottom:'10px',display:'flex',justifyContent:'end'}}>
                <div>
                    <small > note : click to edit</small>
                </div>
            </div>
            <div>
            <ModalComponents onClose={()=>setModalDisplay(false)} id={itemId}  show={modalDisplay} />
            <Table striped bordered hover>
                <thead>
                    <tr >
                        <th >Kode Product</th>
                        <th >Nama Produk</th>
                        <th >Unassigned</th>
                        <th >Kuantitas Total</th>
                        <th >Satuan Product</th>
                        <th>Kode Tempat</th>
                    </tr>
                </thead>
                <tbody>
                    {selector.payload && selector.payload.data.map((e,i)=>
                    <tr key={i} data-tooltip= 'edit' onClick={()=>handleGetItemById(e.id)}>
                        <td >{e.kd_produk}</td>
                        <td>{e.nama_produk}</td>
                        <td>{e.unassigned}</td>
                        <td>{e.total_produk}</td>
                        <td style={{width:'10px'}}>{e.kd_satuan}</td>
                        <td style={{width:'10px'}}>{e.rak}</td>
                    </tr>
                    )}
                </tbody>
            </Table>
            <div style={{float:'right'}}>
                <PaginatedItems />
            </div>
            </div>
        </div>
    )
}