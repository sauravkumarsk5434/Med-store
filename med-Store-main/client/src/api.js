import axios from "axios";


export const getMedicineData = async () => {
    try{
        return await axios.get(`/api/medicinedata`)
    }catch(err) { console.log(err)}
}

export const PostUserApi = async (data) => {
    try{
        return await axios.post(`/api/createuser`, data)
    }catch(err) { console.log(err)}
}

export const GetUserApi = async (data) => {
    try{
        return await axios.post(`/api/getuser`, data)
    }catch(err) { console.log(err)}
}

export const PostPayApi = async (data) => {
    try{
        return await axios.post(`/payment`, data)
    }catch(err) { console.log(err)}
}


export const PostOrderApi = async (data) => {
    try{
        return await axios.post(`/api/createorder`, data)
    }catch(err) { console.log(err)}
}

export const GetOrderApi = async (data) => {
    
    try{
        return await axios.post(`/api/getorder`, data)
    }catch(err) { console.log(err)}
}


