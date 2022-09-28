import React from "react";
import { Card,Button,Alert } from "react-bootstrap";
import Navbars from "./Navbar";

export function RegisterSuccess(){
    return(
        <div style={{position:'absolute',width:'100%',height:'100%',display:'flex',flexDirection:'column'}}>
            <div className="navbar-style-general">
                <Navbars/>
            </div>
            <div style={{margin:'auto'}}>
            <Card className="text-center" >
                <Card.Body>
                    <Card.Title>Register Success</Card.Title>
                    <Card.Text>
                    Silakan klik button untuk pergi ke halaman Login
                    </Card.Text>
                    <Button href="/page/sign-in" variant="primary">Login</Button>
                </Card.Body>
            </Card>
            </div>
        </div>
    )
}

export function RegisterError(){
    return(
    <Alert variant='danger'>
      Email or Username has been used
    </Alert>
    )
}