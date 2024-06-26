import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ViewOrderItems from "../components/UI/ViewOrderItems";
import "../styles/booking-form.css";
import useAxios from "../utils/useAxios";
import "../styles/order-details.css"
import { format } from 'date-fns';

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


const OrderDetails = () =>{
    const { orderId } = useParams();
    const [orderItems, setOrderItems] = useState([]);
    const [date, setDate]=useState(null);
    const [orderInfo, setOrderInfo] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();
    const getOrderItems = useAxios()
 
    const fetchOrderItems = async () => {
        try {
            const response = await getOrderItems.get(`http://localhost:8000/orders/${orderId}/items/`);
            console.log(response)
            setOrderItems(response.data.items);
            setOrderInfo(response.data.info);
            setTotalPrice(response.data.info.total_price)
            setDate(response.data.info.created_at)
        } catch (error) {
            console.error('Error fetching order items:', error);
        }
    };
    useEffect(() => {
      fetchOrderItems();
  }, [orderId]);

  const returnMainPage = () =>{
    navigate('/');
  }

  const formatDate = (isoDateString) => {
    if(!isoDateString){return;}
    const date = new Date(isoDateString);
    return format(date, 'dd MMM, yyyy');
  };
    return (
      <>
        <section
          className="h-100 gradient-custom"
          style={{ backgroundColor: "#eee"  }}
        >
          <MDBContainer className="py-5 h-100" >
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol lg="12" xl="12">
                <MDBCard style={{ borderRadius: "10px" }}>
                  <MDBCardHeader className="px-4 py-5">
                    <MDBTypography tag="h5" className="text-muted mb-0">
                      Thanks for your Order,{" "}
                      <span style={{ color: "#000d6b" }}>{`${orderInfo.Lastname} ${orderInfo.Firstname}`}</span>!
                    </MDBTypography>
                  </MDBCardHeader>
                  <MDBCardBody className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <p
                        className="lead fw-normal mb-0"
                        style={{ color: "#000d6b" }}
                      >
                        Receipt
                      </p>
                      <p className="small text-muted mb-0">
                        Receipt Voucher : 1KAU9-84UIL
                      </p>
                    </div>

                    {orderItems.map((item, index) => (
                      <ViewOrderItems 
                            item={item} 
                            key={item.id || index}
                            isOrderDetail={true}
                      />
                    ))}
                    <div className="d-flex justify-content-between pt-2">
                      <p className="fw-bold mb-0">Order Details</p>
                      <p className="text-muted mb-0">
                        <span className="fw-bold me-4">Total:</span> ${totalPrice.toLocaleString('de-DE')}
                      </p>
                    </div>
  
                    <div className="d-flex justify-content-between pt-2">
                      <p className="text-muted mb-0">Invoice Number : {orderId}</p>
                      <p className="text-muted mb-0">
                        <span className="fw-bold me-4">Discount:</span> ${(totalPrice*0.2).toLocaleString('de-DE')}
                      </p>
                    </div>
  
                    <div className="d-flex justify-content-between">
                      <p className="text-muted mb-0">
                        Invoice Date : {formatDate(date)}
                      </p>
                      <p className="text-muted mb-0">
                        <span className="fw-bold me-4">GST 18%</span> ${(totalPrice*0.8*0.18).toLocaleString('de-DE')}
                      </p>
                    </div>
  
                    <div className="d-flex justify-content-between mb-5">
                      <p className="text-muted mb-0">
                        Recepits Voucher : 18KU-62IIK
                      </p>
                      <p className="text-muted mb-0">
                        <span className="fw-bold me-4">Delivery Charges</span>{" "}
                        Free
                      </p>
                    </div>
                  </MDBCardBody>
                  <MDBCardFooter
                    className="border-0 px-4 py-5"
                    style={{
                      backgroundColor: "#000d6b",
                      borderBottomLeftRadius: "10px",
                      borderBottomRightRadius: "10px",
                    }}
                  >
                    <MDBTypography
                      tag="h5"
                      className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0"
                    >
                      Total paid: <span className="h2 mb-0 ms-2">${(totalPrice*0.98).toLocaleString('de-DE')}</span>
                    </MDBTypography>
                  </MDBCardFooter>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </>
    );

}

export default OrderDetails