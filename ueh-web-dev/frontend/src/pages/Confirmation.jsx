import {React,useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col,Form, FormGroup  } from "reactstrap";
import PaymentMethod from "../components/UI/PaymentMethod";
import BookingForm from "../components/UI/BookingForm";
import "../styles/booking-form.css";
import masterCard from "../assets/all-images/master-card.jpg";
import paypal from "../assets/all-images/paypal.jpg";
import "../styles/payment-method.css";




const Confirmation = () => {
  const { orderId } = useParams();
  const [orderItems, setOrderItems] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    notes: "",
    paymentMethod: ""
  });

  const fetchOrderItems = async () => {
      try {
          const response = await axios.get(`http://localhost:8000/orders/${orderId}/items/`);
          setOrderItems(response.data);
      } catch (error) {
          console.error('Error fetching order items:', error);
      }
  };
  useEffect(() => {
    fetchOrderItems();
}, [orderId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleCreateOrder = async (e) => {
    e.preventDefault();
    const orderData = {
      shippingInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        notes: formData.notes,
      },
      paymentMethod: formData.paymentMethod,
      items: orderItems,
    };

    try {
      const response = await axios.post("http://localhost:8000/orders/create-order/", orderData);
      console.log("Order created:", response.data);
      navigate(`/confirmation/${response.data.orderId}`);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <section>
        <Container>
        <Row>
          <Row>
          <div className="container-fluid">
            <div className="row d-flex justify-content-between">
              <div className="col-12 col-lg-8 mt-5 order-confirm">
                <h4 className="mb-3">Shipping Info</h4>
                <p><b>Name:</b> </p>
                <p><b>Phone:</b> </p>
                <p className="mb-4"><b>Address:</b> </p>
                <hr />
                <h4 className="mt-4">Your Cart Items:</h4>
                <hr />
                <div className="cart-item my-1">
                  <div className="row">
                    <div className="col-4 col-lg-2">
                      <img src="./images/airpords.jpg" alt="Laptop" height="45" width="65" />
                    </div>
                    <div className="col-5 col-lg-6">
                      <a href="#">HP 15-CX0056WM Laptop, 15.6" FHD</a>
                    </div>
                    <div className="col-3 col-lg-4 mt-4 mt-lg-0">
                      <p>1 x $89.99 = <b>$89.99</b></p>
                    </div>
                  </div>
                </div>
                <hr />
                {/* <div className="col-span-2 sm:col-span-1">
                                      <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                      <input value={''} onChange={''} type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required=""/>
                                  </div> */}
              </div>
              <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                  <h4>Order Summary</h4>
                  <hr />
                  <p>Subtotal: <span className="order-summary-values">$89.99</span></p>
                  <p>Shipping: <span className="order-summary-values">$25</span></p>
                  <p>Tax: <span className="order-summary-values">$0</span></p>
                  <hr />
                  <p>Total: <span className="order-summary-values">$114.99</span></p>
                  <hr />
                  <button id="checkout_btn" className="btn btn-primary btn-block" onClick={handleCreateOrder}>Proceed to Payment</button>
                </div>
              </div>
            </div>
          </div>
          </Row>

          <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold ">Booking Information</h5>
                   <Form onSubmit={submitHandler}>
                      <FormGroup className="booking__form d-inline-block me-4 mb-4">
                        <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange}/>
                      </FormGroup>
                      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
                        <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                      </FormGroup>

                      <FormGroup className="booking__form d-inline-block me-4 mb-4">
                        <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} />
                      </FormGroup>
                      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
                        <input type="number" placeholder="Phone Number" />
                      </FormGroup>

                      {/* <FormGroup className="booking__form d-inline-block me-4 mb-4">
                        <input type="text" placeholder="From Address" />
                      </FormGroup> */}
                      <FormGroup className="address__input d-inline-block mb-4">
                        <input type="text" placeholder="To Address" name="address" value={formData.address} onChange={handleInputChange} />
                      </FormGroup>

                      {/* <FormGroup className="booking__form d-inline-block me-4 mb-4">
                        <select name="" id="">
                          <option value="1 person">1 Person</option>
                          <option value="2 person">2 Person</option>
                          <option value="3 person">3 Person</option>
                          <option value="4 person">4 Person</option>
                          <option value="5+ person">5+ Person</option>
                        </select>
                      </FormGroup>
                      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
                        <select name="" id="">
                          <option value="1 luggage">1 luggage</option>
                          <option value="2 luggage">2 luggage</option>
                          <option value="3 luggage">3 luggage</option>
                          <option value="4 luggage">4 luggage</option>
                          <option value="5+ luggage">5+ luggage</option>
                        </select>
                      </FormGroup>

                      <FormGroup className="booking__form d-inline-block me-4 mb-4">
                        <input type="date" placeholder="Journey Date" />
                      </FormGroup>
                      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
                        <input
                          type="time"
                          placeholder="Journey Time"
                          className="time__picker"
                        />
                      </FormGroup> */}

                      <FormGroup>
                        <textarea
                          rows={5}
                          type="textarea"
                          className="textarea"
                          placeholder="Write"
                          name="notes" 
                          value={formData.notes} 
                          onChange={handleInputChange}
                        ></textarea>
                      </FormGroup>
                    </Form>   
              </div>
            </Col>

            <Col lg="5" className="mt-5">
                  <div className="payment__info mt-5">
                    <h5 className="mb-4 fw-bold ">Payment Information</h5>

                    <div className="payment">
                      <label htmlFor="" className="d-flex align-items-center gap-2">
                        <input type="radio" /> Direct Bank Transfer
                      </label>
                    </div>

                    <div className="payment mt-3">
                      <label htmlFor="" className="d-flex align-items-center gap-2">
                        <input type="radio" /> Cheque Payment
                      </label>
                    </div>

                    <div className="payment mt-3 d-flex align-items-center justify-content-between">
                      <label htmlFor="" className="d-flex align-items-center gap-2">
                        <input type="radio" /> Master Card
                      </label>

                      <img src={masterCard} alt="" />
                    </div>

                    <div className="payment mt-3 d-flex align-items-center justify-content-between">
                      <label htmlFor="" className="d-flex align-items-center gap-2">
                        <input type="radio" /> Paypal
                      </label>

                      <img src={paypal} alt="" />
                    </div>
                    <div className="payment text-end mt-5">
                      {/* <button onClick={handleCreateOrder}>Reserve Now</button> */}
                    </div>
                {/* <PaymentMethod
                orderData={orderData}
                itemsData={itemsData} /> */}
              </div>
            </Col>
        </Row>

        </Container>
    </section>
  );
};

export default Confirmation;
