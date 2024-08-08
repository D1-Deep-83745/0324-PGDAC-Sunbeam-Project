import axios from "axios"
import config from "../config"

export async function getLatestInvoices(){

    const token = sessionStorage.getItem('token')
 
    const response = await axios.get(`${config.url}/orders/latest`,{
     headers: {
         Authorization: "Bearer "+token,
     },
    })
    return response
 }