import axios from "axios";
import {jwtDecode} from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const baseURL = import.meta.env.VITE_DOMAIN_BACKEND;

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` }
  });

  axiosInstance.interceptors.request.use(async req => {
    if (authTokens?.access) {
      const user = jwtDecode(authTokens.access);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
  
      if (!isExpired) return req;
  
      const response = await axios.post(`${baseURL}/accounts/token/refresh/`, {
        refresh: authTokens.refresh
      });
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      localStorage.setItem("authTokens", JSON.stringify(response.data));
  
      setAuthTokens(response.data);
      setUser(jwtDecode(response.data.access));
  
      req.headers.Authorization = `Bearer ${response.data.access}`;

    }else {
      console.error('Không có token truy cập.');
    }
    return req;
  });

  return axiosInstance;
};

export default useAxios;