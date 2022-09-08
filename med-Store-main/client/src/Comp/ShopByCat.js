
import React, { useEffect,  useState } from 'react'
import { useHistory } from 'react-router-dom'
import store from '../store/Store'

const ShopByCat = ({ product }) => {
    const history = useHistory()

    return (
        <div class="d-flex rounded-3 overflow-auto p-3 scr-bar bg-white">

            {product != undefined && product.map(val => {
                return (
                    <div onClick={() => history.push(`/product/${val.id}`)} class="shadow rounded-3 mx-4" style={{ width: "200px", textAlign: "center", cursor:"pointer" }}>
                        <img src={val.img} class="mx-2" width="150px" height="120px" />
                        <p class="text-success">{val.title.split(" ")[0]} {val.title.split(" ")[1]}</p>
                        <p><strike>{val.MRP}</strike> <strong class="text-secondary">{val.DMRP}</strong></p>
                        <span class="badge bg-success mb-3">{val.offer}</span>
                    </div>
                )
            })}

        </div>
    )
}

export default ShopByCat
