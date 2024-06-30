import React, { useState} from "react";
import { useCart } from "../../utils/cartContext";
import "../../styles/cart-items.css"
import styled,{ keyframes } from 'styled-components';
import { format } from "date-fns";


import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBProgress,
  MDBProgressBar,
  MDBRow,
} from "mdb-react-ui-kit";


const StyledViewHistoryOrder = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: transform 0.3s ease, box-shadow 0.3s ease; 
  &:hover {
    cursor: pointer;
    transform: scale(1.005);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  }
`;


const ViewHistoryOrder = ({ item}) => {
  console.log(item)
  const [liked, setLiked] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const {removeFromCart, updateCartItemQuantity} =useCart();
  const{id, status, address,total_price ,payment_method ,note,created_at}=item
  const [amount, setQuantity] = useState(1); 
  const formatDate = (isoDateString) => {
    if(!isoDateString){return;}
    const date = new Date(isoDateString);
    return format(date, 'dd MMM, yyyy');
  };


  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  
    if (!item) {
      return <div>Invalid item</div>;
      }

      return(
        <StyledViewHistoryOrder>

          <MDBCard className="shadow-0 border mb-4">
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="2">
                  {/* <MDBCardImage
                    src={imgUrl}
                    fluid
                    alt={carName}
                  /> */}
                  <p className="text-muted mb-0"><b>{id}</b></p>
                </MDBCol>
                <MDBCol
                  md="2"
                  className="text-center d-flex justify-content-center align-items-center"
                >
                  <p className="text-muted mb-0"><b>{capitalizeFirstLetter(status?status:null)}</b>: {formatDate(created_at)}</p>
                </MDBCol>
                <MDBCol
                  md="2"
                  className="text-center d-flex justify-content-center align-items-center"
                >
                  <p className="text-muted mb-0 small">{address}</p>
                </MDBCol>
                <MDBCol
                  md="2"
                  className="text-center d-flex justify-content-center align-items-center"
                >
                  <p className="text-muted mb-0 small">
                    {note}
                  </p>
                </MDBCol>
                <MDBCol
                  md="2"
                  className="text-center d-flex justify-content-center align-items-center"
                >
                  <p className="text-muted mb-0 small">{payment_method}</p>
                </MDBCol>
                <MDBCol
                  md="2"
                  className="text-center d-flex justify-content-center align-items-center"
                >
                  <p className="text-muted mb-0 small">{total_price}</p>
                </MDBCol>
              </MDBRow>
              <hr
                className="mb-4"
                style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
              />
              <MDBRow className="align-items-center">
                <MDBCol md="2">
                  <p className="text-muted mb-0 small">Track Order</p>
                </MDBCol>
                <MDBCol md="10">
                  <MDBProgress
                    style={{ height: "6px", borderRadius: "16px" }}
                  >
                    <MDBProgressBar
                      style={{
                        borderRadius: "16px",
                       backgroundColor: status === "completed" ? "#000d6b" : "red",
                      }}
                      width={(status==="completed"?100:26)}
                      valuemin={0}
                      valuemax={100}
                    />
                  </MDBProgress>
                  <div className="d-flex justify-content-around mb-1">
                    <p className="text-muted mt-1 mb-0 small ms-xl-5">
                      Out for delivary
                    </p>
                    <p className="text-muted mt-1 mb-0 small ms-xl-5">
                      Delivered
                    </p>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard> 
        </StyledViewHistoryOrder>

      );

   

}
export default ViewHistoryOrder