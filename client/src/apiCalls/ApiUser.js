import axios from "axios";
import { LOGIN_API, REGISTER_API } from "./ApiData";

// axios call for login
export const loginCall = async (userCredentials) => {
    try{
        const response = await axios.post(LOGIN_API, userCredentials);
        if (response){
            return response.data;
        }
    }catch(error){
        console.error(error)
    }
}

// axios call for register
export const registerCall = async (userCredentials) => {
    try{
        const response = await axios.post(REGISTER_API, userCredentials);
        if (response){
            return response.data;
        }
    }catch(error){
        console.error(error)
    }
}
