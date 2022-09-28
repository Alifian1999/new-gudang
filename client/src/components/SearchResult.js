import React, { useState } from 'react'
import '../componentStyle/content.css'
import { Table } from 'react-bootstrap'
import ModalComponents from './ModalComponent'
import { useSelector } from 'react-redux'


export default function SearchResult(){
    let selector = useSelector(state=>state.searchReducer)
    let [modalDisplay, setModalDisplay] = useState(false)

    return(
        <div style={{width:'100%',paddingLeft:'20px',paddingRight:'20px'}}>
            <div style={{ width:'100%',marginBottom:'10px',display:'flex',justifyContent:'end'}}>
                <div>
                    <small > note : click to edit</small>
                </div>
            </div>
            <div>
            <ModalComponents onClose={()=>setModalDisplay(false)} show={modalDisplay} />
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
                    {selector.payload && selector.payload.data.data.map((e,i)=>
                    <tr key={i} data-tooltip= 'edit' onClick={()=>setModalDisplay(true)}>
                        <td >{e.coalesce}</td>
                        <td>{e.nama_produk}</td>
                        <td>{e.unassigned}</td>
                        <td>{e.total_produk}</td>
                        <td style={{width:'10px'}}>{e.kd_satuan}</td>
                        <td style={{width:'10px'}}>{e.rak}</td>
                    </tr>
                    )}
                </tbody>
            </Table>
            </div>
        </div>
    )
}