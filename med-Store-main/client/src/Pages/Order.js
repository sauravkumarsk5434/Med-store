
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import store from '../store/Store';
import { GetOrderApi} from '../api'



const Order = () => {
    const history = useHistory();

    const { login, setlogin } = useContext(store);

    const [orderData, setorderData] = useState(login.orders)


    const fetchOrder = async () => {
       
        const res = await GetOrderApi({email :login.email})
        console.log(res)
        localStorage.setItem("user", JSON.stringify(res.data[0]))
        setlogin(res.data[0])
        setorderData(res.data[0].orders)
    }

    useEffect(() => {
        fetchOrder();
    }, [])


    return (
        <div class="row justify-content-center m-0" >

            <div class="col-md-10 shadow-lg my-5 py-3 rounded-3 bg-light">

                <div class="row text-center border-bottom " >
                    <h3 style={{ color: "rgb(81, 201, 166)" }} >Your Orders</h3>
                </div>

                {orderData.length == 0 ?

                    <div class="row text-center my-5">
                        <h1>No Orders Here !</h1>
                        <button class="btn col-3 btn-outline-primary mt-3 mx-auto" onClick={() => history.pushState('/')} >Continue Shopping</button>
                    </div> :

                    <>
                        <div class="row align-items-center justify-content-between border-bottom py-2 ">
                            <div class="col-2 text-center">Order Id</div>
                            <div class="col-4 text-center">Item</div>
                            <div class="col-1 ">Price</div>
                            <div class="col-1 ">Payment</div>
                            <div class="col-2 ">Delivered On</div>
                            <div class="col-2"> Delivery Status</div>
                        </div>

                        <div class=" m-0 "  >

                            {orderData.map(item => {
                                return (
                                    <div class="row border-bottom justify-content-between align-items-center m-0" >
                                        <div class="col-2 text-center ">{item.order_id}</div>
                                        <div class="col-4 ">
                                            {item.products.map(val => {
                                                return (
                                                    <div class="d-flex py-0 ">

                                                        <div >
                                                            <img src={val.img} width="50px" height="50px" style={{ margin: "2px 0px" }} />
                                                        </div>

                                                        <div class=" ms-3 ">
                                                            <span >{val.title}</span><br />
                                                            <span style={{fontSize:"14px", opacity:".8"}}>Price : {val.price}</span>
                                                            <span style={{marginLeft:"20px", fontSize:"14px", opacity:".8"}}>Quantity : {val.qty}</span>
                                                        </div>

                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div class="col-1 ps-3 "> {item.total}</div>
                                        <div class="col-1 ps-4"> Online</div>
                                        <div class="col-2 ps-4 "> {item.delivery_date}</div>
                                        <div class="col-2 ps-5 "> {
                                            item.delivery_date >= new Date().toLocaleDateString() ? "Pending" : "Success"
                                        }</div>

                                    </div>
                                )
                            })}
                        </div>

                    </>
                }
            </div>
        </div>
    )
}

export default Order
