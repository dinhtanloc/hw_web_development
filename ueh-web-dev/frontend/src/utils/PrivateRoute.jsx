import {Route, Navigate,Outlet } from "react-router-dom"
import {useContext} from "react"
import AuthContext from "../context/AuthContext"


const PrivateRoute = () => {
    let {user} = useContext(AuthContext)
    // return <Route {...rest}>{!user ? <Navigate to="/login" /> : children}</Route>
    return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute