import axios from "axios";
import config from "../config";

async function login(email, password) {
    const body = {
        email,
        password,
    };

    const response = await axios.post(`${config.url}/user/signin`, body);
    return response.data;
}

export default login;