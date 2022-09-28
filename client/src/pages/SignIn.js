import React,{useRef,useState} from "react";
import { Form,Button } from "react-bootstrap";
import '../pagesStyle/signIn.css'
import { actionLoginHandler } from "../redux/action/signInAction";
import { useDispatch, useSelector } from 'react-redux'
import { BsPersonFill } from "react-icons/bs";
import { Alert } from "react-bootstrap";
import { CLink } from "@coreui/bootstrap-react";

export default function SignIn(){   
    const selector = useSelector(e=>e.signInReducer)
    const disptach = useDispatch()
    let checkBox = useRef()
    let [types,setType]=useState('password')
    let [email,setEmail]= useState()
    let [password,setPassword]= useState()
    let validate = selector
    let [a,b]=useState(undefined)
    
    function handleSubmit(e){
        e.preventDefault()
        const data={
            email,
            password
        }
        disptach(actionLoginHandler(data))

    }

    function checkBoxHandler(){
        let value = checkBox.current.checked
        if(value===true){
            console.log(true);
            setType('text')
        }else{
            console.log(false);
            setType('password')
        }
    }
    return(
        <div className="container-signIn">
            {validate.error&&<Alert variant="danger">Your email or password doesn't match</Alert>}
            <div className="card-container-signIn">
                <div style={{textAlign:'center',padding:'10px'}}>
                <BsPersonFill style={{marginBottom:'20px'}}  size={50}/>
                <h3 style={{marginBottom:'0px',color: '#bdc3c7',color:' -webkit-linear-gradient(to right, #2c3e50, #bdc3c7)',color: 'linear-gradient(to right, #2c3e50, #bdc3c7)'
                    }}>MEMBER LOGIN</h3>
                </div>
                <Form onSubmit={handleSubmit} style={{margin:'0px 20px'}}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control  type="email" placeholder="Enter email" onChange={e=>setEmail(e.target.value)} />
                        <Form.Text style={{color:'#2c3e50'}} >
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type={types} placeholder="Password" onChange={e=>setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type='checkbox' label="Check me out" ref={checkBox} onClick={checkBoxHandler} />
                    </Form.Group>
                    <div style={{width:'100%',display:'flex',justifyContent:'center',paddingBottom:'10px', paddingTop:'10px'}} className="mx-auto">
                        <Button style={{width:'180px',color:'GrayText'}} variant="dark" type="submit" >
                            LOGIN
                        </Button>
                    </div>
                    <div style={{width:'100%',display:'flex',justifyContent:'center'}}>belum punya akun? daftar <CLink style={{marginLeft:'6px'}} href="/page/sign-up">disini</CLink></div>
                </Form>
            </div>
        </div>
    )
}