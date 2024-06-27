import { React, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import '../styles/profile.css'
import useAxios from "../utils/useAxios"
import ViewHistoryOrder from "../components/UI/ViewHistoryOrder";
import List from '@mui/material/List';
import {
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBCardHeader,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTypography,
  } from "mdb-react-ui-kit";
const InnList = ({ element }) => {
  return (
    <List
      sx={{
        width: '100%',
        height:'320px',
        // maxWidth: 360,
        bgcolor: 'background.paper',
        // position: 'relative',
        overflow: 'auto',
        // maxHeight: 300,
        marginBottom:'5%',
        borderRadius: '16px',
        border: '1px solid #ccc',
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {element}
    </List>
  );
}

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [historyOrders, setHistoryOrders] = useState([]);
  const profileAPI = useAxios();

  useEffect(() => {
    fetchUserProfile();
    fetchHistoryOrder();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await profileAPI.get('accounts/profile/');
      setUserProfile(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchHistoryOrder = async () => {
    try {
      const response = await profileAPI.get('orders/order-history/');
      setHistoryOrders(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleLikeClick = (index) => {
    console.log("Like clicked for item:", index);
  };

  return (
    <div className="body_div">
      <div className="container">
        <div className="main-body">
          <nav aria-label="breadcrumb" className="main-breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">User Profile</li>
            </ol>
          </nav>

          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src={userProfile.image && userProfile.image} alt="Admin" className="rounded-circle" width="150" />
                    <div className="mt-3">
                      <h4>{userProfile.username && userProfile.username}</h4>
                      <p className="text-secondary mb-1">{userProfile.job && userProfile.job}</p>
                      <p className="text-muted font-size-sm">{userProfile.address && userProfile.address}</p>
                      <button className="btn btn-primary" style={{ marginRight: '6px' }}>Follow</button>
                      <button className="btn btn-outline-primary">Message</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userProfile.full_name && userProfile.full_name}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userProfile.email && userProfile.email}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userProfile.phone && userProfile.phone}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userProfile.address && userProfile.address}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Job</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userProfile.job && userProfile.job}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12">
                      <a className="btn btn-info " href={"/profile/edit"}>Edit</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="container">
      <MDBCard style={{ borderRadius: "10px" }}>
                  <MDBCardHeader className="px-4 py-5">
                    <MDBTypography tag="h5" className="text-muted mb-0" style={{ color: "#000d6b" }}>
                      <b>Your history orders information!</b>
                    </MDBTypography>
                  </MDBCardHeader>
                  </MDBCard>
        <InnList element={historyOrders.map((item, index) => (
            <Link key={item.id} to={`/confirmation/${item.id}`}>
          <ViewHistoryOrder
            item={item}
            key={item.id || index}
            handleLikeClick={() => handleLikeClick(index)}
          />
        </Link>
        ))} />
      </div>
    </div>
  );
}

export default Profile;
