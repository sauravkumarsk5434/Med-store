
import React from 'react'

const SubFooter = () => {
    return (
        <div class="row border rounded-3 m-0  mb-3 mx-4 bg-white">
            <div class="col-md-3 col-6 my-3 ">
                <div class="text-center">
                    <i class="bi bi-shield-check" style={{ fontSize: "50px", color: "#51C9A6" }}></i><br />
                    <span class="fs-4 " >100% Secure  </span><br />
                    <span style={{ opacity: ".6" }}>100% Payments Protection</span>
                </div>
            </div>
            <div class="col-md-3 col-6 my-3">
                <div class="text-center">
                    <i class="bi bi-cash-coin" style={{ fontSize: "50px", color: "#51C9A6" }} ></i><br />
                    <span class="fs-4 ">Cash On Delivery</span><br />
                    <span style={{ opacity: ".6" }}>Get first pay later</span>
                </div>
            </div>
            <div class="col-md-3 col-6 my-3">
                <div class="text-center">
                    <i class="bi bi-arrow-clockwise" style={{ fontSize: "50px", color: "#51C9A6" }}></i><br />
                    <span class="fs-4 ">Easy Return </span><br />
                    <span style={{ opacity: ".6" }}>Easy return &amp; refund</span>
                </div>
            </div>
            <div class="col-md-3 col-6 my-3">
                <div class="text-center"> 
                    <i class="bi bi-telephone-outbound" style={{ fontSize: "50px", color: "#51C9A6" }}></i><br />
                    <span class="fs-4 ">Help Center</span><br />
                    <span style={{ opacity: ".6" }}>Call & Get Help</span>
                </div>
            </div>
        </div>
    )
}

export default SubFooter
