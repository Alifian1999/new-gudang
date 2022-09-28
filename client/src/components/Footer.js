import React from "react";
import '../componentStyle/footer.css'




export default function Footer(){

    function GetFullTime(){
        let date = new Date().getDate()
        let monthIndex= new Date().getMonth()
        let year = new Date().getFullYear()
        let fullTime= (`${date}/${monthIndex+1}/${year}`)
        return <>{fullTime}</>
    }
    return(
        <div className="footer-container" style={{paddingLeft:'20px',paddingRight:'20px'}}>
            <div className="break line" style={{borderTop:'1px solid black'}}></div>
            <div className="footer-text">
                <div className="left-footer">
                    <p>Kuantitas stok gudang: PT.TIGA NOVA SENTOSA per tanggal {<GetFullTime/>}</p>
                </div>
                <div className="right-footer">

                </div>
            </div>
        </div>
    )
}