import axios from "axios";

const URL_SERVER ='http://127.0.0.1:8000/'
export const callAPI = async (endpoint, method , body , params) =>{
    const token =  "";
    return await axios({
        method: method,
        url: `${URL_SERVER}${endpoint}`, //Ex: https://backend.com + /products
        headers : {'Authorization':  (token? token:""), "Content-Type": "application/json"},
        data: body,
        params
        
      })
      
}