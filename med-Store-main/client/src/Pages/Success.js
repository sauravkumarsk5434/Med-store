
import React, { useEffect, useContext, useState } from 'react'
import { PostOrderApi } from '../api';
import store from '../store/Store';

const Success = (e) => {
    const [paymentData, setpaymentData] = useState({
        status: "",
        bank: "",
        amount: "",
        txn_id: "",
        order_id: ""
    })

    const { login, setlogin, setcartval } = useContext(store)

    const PostOrder = async () => {

        const cart = JSON.parse(localStorage.getItem("cart")).map(val => ({ img: val.product.img, title: val.product.title, price: val.product.DMRP, qty: val.qty }))

        await PostOrderApi({ email: login.email, paymentData, cart })
        localStorage.removeItem("cart")

    }

    useEffect(() => {
        const params = e.location.search.split("?")[1];
        setcartval(0)

        if (paymentData.status == "") {
            setpaymentData({
                status: params.split(",")[0], txn_id: params.split(",")[1], amount: params.split(",")[2].split(".")[0],
                bank: ` ${params.split(",")[3].split("%20")[0]} ${params.split(",")[3].split("%20")[1]}`, order_id: params.split(",")[4].split("_")[1]
            })
        }

        if (paymentData.status != "") {
            if(paymentData.status != "TXN_FAILURE"){
                PostOrder()
            }else{
                localStorage.removeItem("cart")
            }
            
        }


    }, [paymentData])




    return (
        <div class="row justify-content-center my-5">
            <div class="col-xl-4 col-md-6 shadow-lg rounded-3 bg-white px-5">
                {paymentData.status == "TXN_SUCCESS" ?

                    <div class="row text-center">
                        <i class="bi bi-check2-circle text-success" style={{ fontSize: "50px" }}></i>
                        <h2 class="text-success">Payment Successfull</h2>
                    </div> :

                    <div class="row text-center">
                        <i class="bi bi-x-circle text-danger" style={{ fontSize: "50px" }}></i>
                        <h2 class="text-danger">Payment Failed</h2>
                    </div>

                }



                <div class="d-flex justify-content-between mt-4">
                    <span>Payment Type</span>
                    <span>Net Banking</span>
                </div>

                <div class="d-flex justify-content-between">
                    <span>Bank</span>
                    <span>{paymentData.bank}</span>
                </div>

                {/* <div class="d-flex justify-content-between">
                    <span>Mobile</span>
                    <span>56654657567</span>
                </div>

                <div class="d-flex justify-content-between">
                    <span>Email</span>
                    <span>rs@gmail.com</span>
                </div> */}

                <div class="d-flex justify-content-between">
                    <span>Amount Paid</span>
                    <span>Rs. {paymentData.amount}</span>
                </div>

                <div class="d-flex justify-content-between">
                    <span>Transaction Id</span>
                    <span>{paymentData.txn_id}</span>
                </div>

                <div class="d-flex justify-content-around my-5">
                    <span class="btn btn-outline-success px-4" onClick={() => e.history.push('/order')}>View Orders</span>
                    <span class="btn btn-outline-success px-5" onClick={() => e.history.push('/')}>Home</span>
                </div>


            </div>
        </div>
    )
}

export default Success


// TXN_SUCCESS,11127835171,55.00,Andhra%20Bank,TEST_1642518426677