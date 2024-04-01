import axios from "axios";

const URL_SERVER = "https://fakestoreapi.com"
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