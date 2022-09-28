import React , {useState} from "react";
import { Form,Button } from "react-bootstrap";
import { CLink } from "@coreui/bootstrap-react";
import '../pagesStyle/signUp.css'
import { handleRegister } from "../redux/action/signUpAction";
import { useDispatch,useSelector } from "react-redux";
import { RegisterSuccess, RegisterError } from "../components/RegisterStatus";


export default function SignUp(){
    let [username,setUsername]= useState()
    let [password,setPassword]= useState()
    let [confirmPassword,setConfirmPassword]= useState()
    let [email,setEmail]= useState()
    const dispatch = useDispatch()
    const selector = useSelector(state=>state.registerReducer)

    const displayStatus = selector.status
    console.log(displayStatus);

function submitHandler(e){
    e.preventDefault()
    if(password !== confirmPassword){
        return alert('your password is not the same')
    }
    console.log(username);
    console.log(password);
    console.log(email);
    console.log(confirmPassword);
    const data ={
        username : username,
        password : password,
        email : email
    }
    dispatch(handleRegister(data))
    }

    if(displayStatus === 'success') return <RegisterSuccess/>

    return(
        <div>
            { displayStatus&& <RegisterError/>}
            <div className="container-signUp">
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" onChange={e=>setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={e=>setEmail(e.target.value)} />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="cofirmationFormBasicPassword">
                        <Form.Label>Confirmation Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={e=>setConfirmPassword(e.target.value)} />
                    </Form.Group>
                    <Button style={{width:'88px'}} variant="primary" type="submit">
                        Submit
                    </Button>
                    <Form.Text style={{marginLeft:'25px'}}>sudah punya akun? klik<CLink style={{marginLeft:'6px'}} href="/page/sign-in">disini</CLink> untuk login</Form.Text>
                </Form>
            </div>
        </div>
    )
}