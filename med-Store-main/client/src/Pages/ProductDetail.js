
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import store from '../store/Store'
import Notiflix from 'notiflix';

const ProductDetail = (e) => {

    const [product, setproduct] = useState(undefined)

    const { productData, setcartval } = useContext(store);

    const AddToCart = () => {

        const localcart = JSON.parse(localStorage.getItem("cart"))

        if (localcart == null) {
            const setlocalcart = [{ product: product, qty: "1" }]
            localStorage.setItem("cart", JSON.stringify(setlocalcart))
            setcartval(setlocalcart.length)
            Notiflix.Notify.success("Add in Cart")
        } else {
            const prdfind = localcart.find(val => val.product.id == product.id)
            if (prdfind) {
                Notiflix.Notify.failure("Already in cart")
            } else {
                const setlocalcart = [...localcart, { product: product, qty: "1" }]
                localStorage.setItem("cart", JSON.stringify(setlocalcart))
                setcartval(setlocalcart.length)
                Notiflix.Notify.success("Add in Cart")
            }
        }
    }

    useEffect(() => {
        const result = productData.find(val => Number(val.id) === Number(e.match.params.id))
        setproduct(result)
    }, [productData])





    return (
        <>

            {product === undefined ?

                <div class="spinner-border spinner-border-sm text-primary" style={{ width: "5rem", height: "5rem", marginLeft: "45%", marginTop: "40vh" }}></div>

                :
                <div class="row m-0 p-5 bg-light">
                    <div class="col-md-4">
                        <div style={{ width: "80%" }}>
                            <img src={product.img} width="100%" />
                        </div>
                    </div>

                    <div class="col-md-8 border p-3 rounded-3 bg-white">
                        <h4>{product.title}</h4>
                        <p class="text-secondary">{product.subTitle}</p>
                        <p class="opacity-50 mb-3" >Rating : {Array(1, 2, 3, 4, 5).map((val, i) => {
                            if (i < product.review) {
                                return (<span>⭐</span>)
                            }
                        })} <span></span> </p>

                        <h4>MRP : {product.DMRP} <strike style={{ marginLeft: "10px", opacity: ".6", fontSize: "18px" }}>{product.MRP}</strike> <span class="badge bg-success ms-3" style={{ fontSize: "12px" }} >{product.discount}</span></h4>

                        <h6 class="text-success mt-3">Availablity : {product.Stock} </h6>



                        <button class=" btn btn-outline-danger mt-5 col-md-5" onClick={AddToCart}>Add To Cart</button>


                    </div>

                    <div class="row ms-1 mt-5 p-3 border rounded-3 bg-light">

                        <h4 style={{ color: "red", marginBottom: "30px" }}>Description</h4>

                        <div class="shadow rounded-3 mb-4 p-3 bg-white">
                            <h6>Properties</h6>
                            <span style={{ opacity: ".8", color: "#51C9A6" }}>Weight - {product.discription.property.weight}</span><br />
                            <span style={{ opacity: ".8", color: "#51C9A6" }}>Dimension - {product.discription.property.dim}</span>
                        </div>

                        <div class="shadow rounded-3 mb-4 p-3 bg-white">
                            <h6>About</h6>
                            <span style={{ opacity: ".8", color: "#51C9A6" }}>{product.discription.about}</span>

                        </div>

                        <div class="shadow rounded-3 mb-4 p-3 bg-white">
                            <h6>Ingredients </h6>
                            <span style={{ opacity: ".8", color: "#51C9A6" }}>{product.discription.indegrdients}</span><br />

                        </div>

                        <div class="shadow rounded-3 mb-4 p-3 bg-white">
                            <h6>Benefits </h6>
                            {product.discription.benefits.map((val, i) =>
                                (<><span style={{ opacity: ".8", color: "#51C9A6" }} >{i + 1}. {val} </span><br /></>))
                            }
                        </div>

                        <div class="shadow rounded-3 mb-4 p-3 bg-white">
                            <h6>Precautions</h6>
                            {product.discription.precaution.map((val, i) =>
                                (<><span style={{ opacity: ".8", color: "#51C9A6" }} >{i + 1}. {val} </span><br /></>))
                            }
                        </div>
                    </div>
                </div>
            }

        </>
    )
}

export default ProductDetail
