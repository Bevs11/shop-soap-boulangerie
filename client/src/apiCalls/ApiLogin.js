import axios from "axios";

export const loginCall = async (userCredentials, dispatch) => {
    try{
        const response = await axios.post('http://localhost:8080/api/v1/auth/login', userCredentials);
        dispatch({type:'LOGIN_SUCCESSFUL', payload: response.data});
    }catch(error){
        dispatch({type:'LOGIN_FAILED', payload:error});
    }
}
