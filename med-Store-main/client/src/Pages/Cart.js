
import Notiflix from 'notiflix';
import React, { useState, useEffect, useContext } from 'react';
import store from '../store/Store';
import { PostPayApi } from '../api'
import { post } from '../paytm';
import { useHistory } from 'react-router-dom';

const Cart = () => {
    const history = useHistory()
    const [cartData, setcartData] = useState(null);
    const [address, setaddress] = useState("")
    const [total, settotal] = useState(50)

    const { setcartval, login } = useContext(store);

    const AddQty = (e) => {

        let id = e.target.value.split(",")[0]
        let updateQty = e.target.value.split(",")[1]
        cartData.map(val => {
            if (val.product.id == id) {
                return val.qty = updateQty
            }
        })

        localStorage.setItem("cart", JSON.stringify(cartData))
        window.location.reload()

    }

    const RemoveProduct = (e) => {
        const removeCart = cartData.filter(val => val.product.id != e)

        if (removeCart.length == 0) {
            localStorage.removeItem("cart")

        } else {
            setcartData(removeCart)
            localStorage.setItem("cart", JSON.stringify(removeCart))
            setcartval(removeCart.length)

        }
        window.location.reload()

    }

    const getAmount = (data) => {

        if(data != null){
            let amount = 0;

            data.map(item => {
                amount = amount + (Number(item.product.DMRP.split("₹")[1] * Number(item.qty)))
            })

            settotal(amount)
        }

    }

    const PlaceOrder = async () => {

        if (address != "") {
            const res = await PostPayApi({ cost: total, name: login.firstName, email: login.email, phone: login.mobile })
          
            const info = {
                action: 'https://securegw-stage.paytm.in/order/process',
                params: res.data
            }
            
            post(info)

        } else {
            Notiflix.Notify.failure("Please Add Address")
        }
    }


    useEffect(() => {
        const localcart = JSON.parse(localStorage.getItem("cart"));
        setcartData(localcart)
        getAmount(localcart)

    }, [])


  

    return (

        <div class="row justify-content-center m-0" >
            <div class="col-lg-8 shadow-lg my-5 rounded-3 bg-light">

                <div class="row text-center border-bottom mt-3">
                    <h3 style={{ color: "rgb(81, 201, 166)" }} >Shopping Cart</h3>
                </div>

                {cartData == null ?

                    <div class="row text-center my-5">
                        <h1>No Products Available</h1>
                        <button class="btn col-3 btn-outline-primary mt-3 mx-auto" onClick={() => window.location.href = "/"} >Continue Shopping</button>
                    </div> :

                    <>
                        <div class="row align-items-center border-bottom border-dark py-2 ">
                            <div class="col-6 text-center">Item</div>
                            <div class="col-2  ">Quantity</div>
                            <div class="col-1  ms-2 ms-md-5">Price</div>
                            <div class="col-2   text-center">Sub Total</div>
                        </div>

                        <div class=" m-0 " style={{ height: "380px", overflow: "auto" }} >

                            {cartData.map(item => {
                                return (
                                    <div class="row border-bottom align-items-center m-0" style={{ height: "80px" }}>
                                        <div class="col-6 ">
                                            <img src={item.product.img} width="50px" height="50px" />
                                            <span class="ms-3">{item.product.title}</span>
                                        </div>
                                        <div class="col-2 text-center">
                                            <select class="form-select" style={{ width: "60px" }} onChange={AddQty} >
                                                <option value={`${item.product.id},1`} selected={item.qty == 1} >1</option>
                                                <option value={`${item.product.id},2`} selected={item.qty == 2} >2</option>
                                                <option value={`${item.product.id},3`} selected={item.qty == 3} >3</option>
                                            </select></div>
                                        <div class="col-2 text-center">{item.product.DMRP}</div>
                                        <div class="col-2 d-flex justify-content-around">{Number(item.qty) * Number(item.product.DMRP.split("₹")[1])}<i style={{ cursor: "pointer" }} onClick={() => RemoveProduct(item.product.id)} class="bi bi-x-circle"></i></div>
                                    </div>
                                )
                            })}
                        </div>

                        <div class="row mt-2 pt-2 px-4 justify-content-between" style={{ backgroundColor: "#e0fff5" }}>

                            <div class="col-md-5 mb-2">
                                <textarea class="form-control mt-2" value={address} onChange={text => setaddress(text.target.value)} placeholder='Enter Address Here !' style={{ height: "150px" }}></textarea>
                            </div>

                            <div class="col-md-5 mb-3 " >
                                <div class="d-flex justify-content-between">
                                    <span>Total : </span>
                                    <span>{total}</span>
                                </div>
                                <div class="d-flex justify-content-between border-bottom py-2">
                                    <span>Delivery Charge : </span>
                                    <span>50</span>
                                </div>
                                <div class="fs-4 d-flex justify-content-between">
                                    <span>Grand Total : </span>
                                    <span>{total + 50}</span>
                                </div>
                                <div class="d-flex justify-content-between mt-3">
                                    <button onClick={() => history.push("/")} class="col-md-6 btn btn-outline-primary">Continue Shopping</button>
                                    <button class="col-md-5 btn btn-outline-success" onClick={() => {
                                       
                                        if (login.email) {
                                            PlaceOrder()
                                        } else {
                                            Notiflix.Notify.failure("Please Login First")
                                        }

                                    }}>Place Order</button>
                                </div>
                            </div>


                        </div>
                    </>


                }



            </div>
        </div>

    )
}

export default Cart
