import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Content from "../components/Content";

import React from "react";
import '../pagesStyle/mainPage.css'

export default function MainPage(){
    const isLogin = localStorage.getItem('user')
    if(isLogin === null) return 
    return(
        <div className="container-main-page">
            <Navbar/>
            <Content/>
            <Footer/>
        </div>
    )
}