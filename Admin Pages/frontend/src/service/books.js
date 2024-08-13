import axios from "axios"
import config from "../config"

export async function getTableData(){

    const token = sessionStorage.getItem('token')
 
    const response = await axios.get(`${config.url}/books/list`,{
     headers: {
         Authorization: "Bearer "+token,
     },
    })
    return response
 }

 export async function getCategories(){

    const token = sessionStorage.getItem('token')
 
    const response = await axios.get(`${config.url}/categories/listAll`,{
     headers: {
         Authorization: "Bearer "+token,
     },
    })
    return response
 }
  

 export async function getInventory(){
    const token = sessionStorage.getItem('token')
 
    const response = await axios.get(`${config.url}/books/inventory`,{
     headers: {
         Authorization: "Bearer "+token,
     },
    })
    return response
 }

 export async function deletebook(id){
    const token = sessionStorage.getItem('token')
 
    const response = await axios.delete(`${config.url}/books/deletebook/${id}`,{
     headers: {
         Authorization: "Bearer "+token,
     },
    })
    return response
 }

 export async function getAllAuthors(){
    const token = sessionStorage.getItem('token')
 
    const response = await axios.get(`${config.url}/books/getAuthors`,{
     headers: {
         Authorization: "Bearer "+token,
     },
    })
    return response
 }


 export async function getPublishers(){
    const token = sessionStorage.getItem('token')
 
    const response = await axios.get(`${config.url}/books/publishers`,{
     headers: {
         Authorization: "Bearer "+token,
     },
    })
    return response
 }

 export async function getBookById(id){
    const token = sessionStorage.getItem('token')
 
    const response = await axios.get(`${config.url}/books/${id}`,{
     headers: {
         Authorization: "Bearer "+token,
     },
    })
    return response
 }

 export async function updateBook(id, title, description, price, publishDate, categoryId, authorId, publisherId) {
    const token = sessionStorage.getItem('token');
    const body = {
       title: title,
       description:description,
       price: price,
       publishDate:publishDate,
        categoryId: categoryId || null,
        authorId: authorId || null,
        publisherId: publisherId || null,
    };
   
    const response = await axios.put(`${config.url}/books/${id}`, body, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response;
}


export async function addCategory(categoryName) {
    const token = sessionStorage.getItem('token');
    const body = {
        categoryName
    };
   
    const response = await axios.post(`${config.url}/categories/addCategory`, body, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response;
}

export async function addAuthor(authorName) {
    const token = sessionStorage.getItem('token');
    const body = {
        authorName
    };
   
    const response = await axios.post(`${config.url}/author/add`, body, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response;
}


export async function addPublisher(publisherName) {
    const token = sessionStorage.getItem('token');
    const body = {
        publisherName
    };
   
    const response = await axios.post(`${config.url}/publisher/add`, body, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response;
}

export async function addBook(title, description, price, publishDate, categoryId,authorId,publisherId) {
    const token = sessionStorage.getItem('token');
    const body = {
        title:title,
        description:description,
	    price:price,
	   publishDate:publishDate,
	   categoryId:categoryId,
	   authorId:authorId,
	   publisherId:publisherId,
       userId:sessionStorage.getItem('id')
    };
   
    const response = await axios.post(`${config.url}/books/add`, body, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response;
}



export async function updateInventory(updatedItem) {
    const token = sessionStorage.getItem('token');
    const body = {
        available_quantity: updatedItem.available_quantity 
    };
   
    const response = await axios.put(`${config.url}/books/inventory/${updatedItem.id}`, body, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response;
}


export async function addInventory(newItem) {
    const token = sessionStorage.getItem('token');

    const body = { 
     title:newItem.title,
     available_quantity:newItem.available_quantity,
     location:newItem.location
    };
   
    const response = await axios.post(`${config.url}/books/inventory/add`, body, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response;
}