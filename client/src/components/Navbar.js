import React, {useState} from "react";
import '../componentStyle/navbar.css'
import {CNavbar,CContainer,CNavbarToggler,COffcanvas,COffcanvasHeader,COffcanvasTitle,CCloseButton,COffcanvasBody,CNavbarNav,CNavItem,CNavLink,CDropdown,CDropdownToggle,CDropdownMenu,CDropdownItem,CDropdownDivider,CForm,CFormInput,CButton} from '@coreui/bootstrap-react'
import { Button } from "react-bootstrap";
import Logo from '../images/warehouse-logo.png'
import Search from "./Search";


export default function Navbars(){
    const [visible, setVisible] = useState(false)
    const user = localStorage.getItem('user')

    function handleLogout(){
        localStorage.removeItem('user')
    }

    return(
        <div className="navbar-container" style={{width:'100%'}}>
            <CNavbar colorScheme="light"  expand="xxl">
                <CContainer fluid>
                    <CNavbarToggler
                        aria-controls="offcanvasNavbar2"
                        aria-label="Toggle navigation"
                        onClick={() => setVisible(!visible)}
                    />
                    <COffcanvas  id="offcanvasNavbar2" placement="start" portal={false} visible={visible} onHide={() => setVisible(false)}>
                        <COffcanvasHeader>
                            {user?<COffcanvasTitle>{user}</COffcanvasTitle>:<COffcanvasTitle>Alfirazi, Alifian</COffcanvasTitle>}
                            <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
                        </COffcanvasHeader>
                        <COffcanvasBody>
                            <CNavbarNav style={{textAlign:'start'}}>
                                <CNavItem>
                                    <CNavLink href="/">Gudang</CNavLink>
                                </CNavItem>
                            </CNavbarNav>
                            <Search/>
                            <div style={{display:'flex',justifyContent:'start',marginTop:'10%'}}>
                            <Button onClick={handleLogout} href={'/page/sign-in'}  variant="danger">Keluar</Button>
                            </div>
                        </COffcanvasBody>
                    </COffcanvas>
                </CContainer>
            </CNavbar>
            <div style={{width:"20%", margin:'auto 0'}}>
                <img style={{width:'100%'}} src={Logo} alt="" />
            </div>
        </div>
    )
}