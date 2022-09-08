
import React from 'react'
import { useHistory } from 'react-router-dom'

const Footer = () => {
    const history = useHistory()
    return (
        <div style={{ background: "#51C9A6", color: "white", padding: "20px 0px" }}>

            <div class="container d-flex justify-content-between">

                <div class="d-flex flex-column">
                    <h5 onClick={() => history.push('/')} style={{ cursor: "pointer" }}>Med Store</h5>
                    <a onClick={() => history.push('/contact')} style={{ cursor: "pointer" }}>Contact Us</a>
                    <a onClick={() => history.push('/about')} style={{ cursor: "pointer" }}>About Us</a>
                </div>



                <div class="d-flex flex-column">
                    <h5>Payment Methods</h5>
                    <a><i class="fa fa-credit-card"></i> Debit/Credit Cards</a>
                    <a><i class="fa fa-desktop"></i> Net Banking</a>
                   
                </div>

                <div class="d-flex justify-content-center">

                    <i class="bi bi-shield-check me-3" style={{ fontSize: "40px" }}></i>

                    <div style={{ fontSize: "14px", marginTop: "10px" }}>
                        <span>100% Secured &amp; Trusted</span>
                        <p>Secure payments by <b>Razorpay</b></p>
                    </div>

                </div>

            </div>




        </div>
    )
}

export default Footer
