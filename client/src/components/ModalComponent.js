import React, { useState,useEffect } from "react";
import '../componentStyle/modalComponent.css'
import { Modal,Button,Table, CloseButton } from "react-bootstrap";
import { handleEdit } from "../redux/action/editAction";
import { useDispatch,useSelector } from 'react-redux'
import { handleProduk } from "../redux/action/kodeProdukAction";
import { handleSatuan } from "../redux/action/kodeSatuanAction";
import { handleItemById } from "../redux/action/getItemById";

export default function ModalComponents(props){
    const dispatch = useDispatch()
    let selectorProduk = useSelector(state => state.kodeProdukReducer)
    let selectorSatuan = useSelector (state => state.kodeSatuanReducer)
    let selectorItemById = useSelector(state=>state.itemById)

    let displayKodeProduk = selectorProduk.payload&&selectorProduk.payload
    let displayKodeSatuan = selectorSatuan.payload&&selectorSatuan.payload
    let displayItemById = selectorItemById.payload&&selectorItemById.payload.data

    let [edit,setEdit] = useState(false)
    let [kodeProduct,setKodeProduct] = useState('')
    let [namaProduct,setNamaProduct] = useState('')
    let [unassigned,setUnassigned] = useState('')
    let [kuantitasTotal,setKuantitasTotal] = useState('')
    let [satuanProduct,setSatuanProduct] = useState('')


    function showItemToEdit (){
        dispatch(handleProduk())
        dispatch(handleSatuan())
        setEdit(true)
    }

    function handleEditSubmit(){
        let input={
            data:{
            kd_produk   : kodeProduct,
            nama_produk : namaProduct,
            unassigned  : unassigned,
            total_produk    : kuantitasTotal,
            kd_satuan : satuanProduct
            },
            id  :props.id
        }
        dispatch(handleEdit(input))
        dispatch(handleItemById(props.id))
    }

    //useEffect disini berfungsi apabila displayItemById ke trigger
    //dan apabila terjadi maka akan men-setting setEdit menjadi false
    //hal ini bertujuan apabila user sudah masuk menu edit(sudah click edit) tapi batal 
    //dan langsung men-close modal edit(tanpa men-click cancel edit terlebih dahulu) 
    //dan apabila itu terjadi maka modalEdit akan kembali ke keadaan awal
    useEffect(()=>{
        setEdit(false)
    },[displayItemById,selectorItemById])

    
    if(!props.show){
        return null
    }
    return(
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">Edit Data</Modal.Title>
                <CloseButton onClick={props.onClose} />
            </Modal.Header>
            <div style={{display:'flex', padding:'10px'}}>
                <Table striped bordered hover>
                    <thead>
                        <tr >
                            <th >Kode Produk</th>
                            <th >Nama Produk</th>
                            <th >Unassigned</th>
                            <th >Kuantitas Total</th>
                            <th >Satuan Produk</th>
                        </tr>
                    </thead>
                    <tbody>
                        {edit?
                        <tr>
                            <td>   
                                <select onClick={e=>setKodeProduct(e.target.value)} style={{width:'100%'}}>
                                    <option style={{textAlign:'center'}}>kode</option>
                                {displayKodeProduk&&displayKodeProduk.data.map((data,key)=>
                                    <option style={{textAlign:'center'}} value={data.id} key={key} >{data.kd_produk}</option>
                                )}
                                </select>
                            </td>
                            <td>
                                <input onChange={e=>setNamaProduct(e.target.value)} style={{width:'100%'}} />
                            </td>
                            <td>
                                <input type='number' min='0' onChange={e=>setUnassigned(e.target.value)} style={{width:'100%'}} required/>
                            </td>
                            <td>
                                <input type='number' min='0' onChange={e=>setKuantitasTotal(e.target.value)} style={{width:'100%'}} required/>
                            </td>
                            <td>
                                <select onClick={e=>setSatuanProduct(e.target.value)} style={{width:'100%'}}>
                                    <option style={{textAlign:'center'}}>satuan</option>
                                    {displayKodeSatuan&&displayKodeSatuan.data.map((data,key)=>
                                    <option style={{textAlign:'center'}} value={data.id} key={key}>{ data.kd_satuan}</option>
                                    )}
                                </select>
                            </td>
                        </tr>
                        : displayItemById&&
                        <tr>
                            <td>{displayItemById.kd_produk?displayItemById.kd_produk:'N/A'}</td>
                            <td>{displayItemById.nama_produk}</td>
                            <td>{displayItemById.unassigned}</td>
                            <td>{displayItemById.total_produk}</td>
                            <td style={{width:'10px'}}>{displayItemById.kd_satuan}</td>
                        </tr> 
                    }
                    </tbody>
                </Table>
            </div>
                <Modal.Footer style={{display:'flex',justifyContent:'space-between'}}>
            <div>
                {edit?
                <Button onClick={()=>setEdit(false)} style={{marginRight:'10px'}}>cancel</Button> :
                <Button onClick={()=>showItemToEdit()} style={{marginRight:'10px'}}>Edit</Button>
                }
            </div>
            <div>
                {edit?
                <Button onClick={()=>[setEdit(false),handleEditSubmit()]}  style={{marginLeft:'10px'}} variant="primary">Save changes</Button>:
                <></>
                }
            </div>
            </Modal.Footer>
      </Modal>
    )
}