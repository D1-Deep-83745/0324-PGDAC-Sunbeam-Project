import axios from "axios";
import config from "../config";

export async function login(email, password) {
    const body = {
        email,
        password,
    };

    const response = await axios.post(`${config.url}/user/signin`, body);
    return response.data;
}

export async function getAllUsers() {
    const token = sessionStorage.getItem('token');

    const response = await axios.get(`${config.url}/user/getAll`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response;
}


export async function addSalesMan(formData) {
    const token = sessionStorage.getItem('token');
    
    const body = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        dob:formData.dob,
        gender: formData.gender,
        phoneNo: formData.phoneNo,
        password: formData.password,
        userRole: formData.userRole, 
    };

    const response = await axios.post(`${config.url}/user/RegisterSalesPerson`, body, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    return response;
}

export async function blockUser(id) {
    const token = sessionStorage.getItem('token');

    const response = await axios.delete(`${config.url}/user/${id}`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response;
}

export async function updateProfile(formDataToSend){
    
    const token = sessionStorage.getItem('token');
    const response = await axios.put(`${config.url}/user/${sessionStorage.getItem('id')}`, formDataToSend, {
        headers: {
            Authorization: "Bearer " + token,
         'Content-Type': 'multipart/form-data',
        },
        
    });
    return response
}

export async function getProfile() {
    const id = sessionStorage.getItem('id')
    const token = sessionStorage.getItem('token');

    const response = await axios.get(`${config.url}/user/${id}`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response;
}


export async function getReviews() {
    const token = sessionStorage.getItem('token');

    const response = await axios.get(`${config.url}/reviews/getReviews`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response;
}