import {createContext, useState, useEffect} from "react";
import { jwtDecode }  from "jwt-decode";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";  


const AuthContext = createContext();

export default AuthContext

export const AuthProvider = ({ children }) => {
    const navigate =useNavigate()
    const [logined, isLogin] = useState(null)
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    

    const [user, setUser] = useState(() => 
        localStorage.getItem("authTokens")
            ? jwtDecode (localStorage.getItem("authTokens"))
            : null
    );


    const [loading, setLoading] = useState(true);

    // const navigate = useNavigate();

    const loginUser = async (email, password) => {
        const response = await fetch("http://127.0.0.1:8000/accounts/token/", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })
        const data = await response.json()

        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwtDecode (data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))
            isLogin(true);
            navigate("/") // chuyen trang
            Swal.fire({
                title: "Login Successful",
                icon: "success",
                toast: true,
                timer: 2000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })

        } else {    
            Swal.fire({
                title: "Username or passowrd does not exists",
                icon: "error",
                toast: true,
                timer: 2000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    // const registerUser = async (email, username, password, password2) => {
    const registerUser = async (email, username, password) => {
        const response = await fetch("http://127.0.0.1:8000/accounts/register/", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email, username, password
            })
        })
        if(response.status === 201){
            // navigate("/login")
            Swal.fire({
                title: "Registration Successful, Login Now",
                icon: "success",
                toast: true,
                timer: 2000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        } else {
            Swal.fire({
                title: "An Error Occured " + response.status,
                icon: "error",
                toast: true,
                timer: 2000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        isLogin(false)
        // window.location.reload();
        // navigate("/login")
        Swal.fire({
            title: "You have been logged out...",
            icon: "success",
            toast: true,
            timer: 2000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        })

    }

    const contextData = {
        user, 
        setUser,
        logined,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
    }

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode (authTokens.access))
        }
        setLoading(false)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )

}
