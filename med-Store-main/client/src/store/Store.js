
import React, { createContext, useEffect, useState } from "react";
import { getMedicineData } from "../api";
import axios from "axios";


const store = createContext();


export const StoreProvider = (prop) => {

    const [productData, setproductData] = useState([])
    const [cartval, setcartval] = useState(0)
    const [login, setlogin] = useState({})

    const GetMedicineData = async () => {
        const res = await getMedicineData();
     
        setproductData(res.data)
    }

    useEffect(() => {
      
        GetMedicineData()
        const c = JSON.parse(localStorage.getItem("cart"))
        if(c == null){
            setcartval(0)
        }else{
            setcartval(c.length)
        }
       
       
    }, [])

    useEffect(() => {
       const log = JSON.parse(localStorage.getItem("user"))
       if(log != null){
        setlogin(log)
       }
    }, [])
   

    return (
        <store.Provider value={{productData, cartval, setcartval, login, setlogin}}>
            {prop.children}
        </store.Provider>
    )
}

export default store;