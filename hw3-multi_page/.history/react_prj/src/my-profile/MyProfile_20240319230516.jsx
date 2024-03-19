import React from "react";
import { Link } from 'react-router-dom';


const MyProfile = () =>{
    return(
        <>
            <div>
            <Link to="/my-profile/password">Change Password</Link>

            </div>
        </>
    )
}

export default MyProfile;