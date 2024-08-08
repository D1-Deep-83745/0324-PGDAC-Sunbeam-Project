import axios from "axios"
import config from "../config"

export async function tallyBooks(){

   const token = sessionStorage.getItem('token')

   const response = await axios.get(`${config.url}/books/count`,{
    headers: {
        Authorization: "Bearer "+token,
    },
   })
   return response
}

export async function tallyCategories(){

    const token = sessionStorage.getItem('token')
 
    const response = await axios.get(`${config.url}/categories/count`,{
     headers: {
         Authorization: "Bearer "+token,
     },
    })
    return response
 }

 export async function tallyUsers(){

    const token = sessionStorage.getItem('token')
 
    const response = await axios.get(`${config.url}/user/count`,{
     headers: {
         Authorization: "Bearer "+token,
     },
    })
    return response
 }

 export async function tallyReviews(){

    const token = sessionStorage.getItem('token')
 
    const response = await axios.get(`${config.url}/reviews/count`,{
     headers: {
         Authorization: "Bearer "+token,
     },
    })
    return response
 }

 export async function tallyBookChartData(){

    const token = sessionStorage.getItem('token')
 
    const response = await axios.get(`${config.url}/books/bookchartData`,{
     headers: {
         Authorization: "Bearer "+token,
     },
    })
    return response
 }


 export async function tallyDayWiseSale(){

    const token = sessionStorage.getItem('token')
 
    const response = await axios.get(`${config.url}/books/dayWiseSale`,{
     headers: {
         Authorization: "Bearer "+token,
     },
    })
    return response
 }