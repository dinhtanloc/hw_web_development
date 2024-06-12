import {React,useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col,Form, FormGroup  } from "reactstrap";
import { useCart } from "../utils/cartContext";
import ViewOrderItems from "../components/UI/ViewOrderItems";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PaymentMethod from "../components/UI/PaymentMethod";
import BookingForm from "../components/UI/BookingForm";
import "../styles/booking-form.css";
import masterCard from "../assets/all-images/master-card.jpg";
import paypal from "../assets/all-images/paypal.jpg";
import "../styles/payment-method.css";
import useAxios from "../utils/useAxios";



const Confirmation = () => {
  const {cartItems} = useCart();
  const navigate = useNavigate();
  // const [orderItems, setOrderItems] = useState(cartItems);
  const getOrder=useAxios();
  const styles ={
    height: '50px',
    borderBottom: '1px solid #E1E8EE',
    padding: '0px 30px',
    color: '#5E6977	',
    fontSize: '26px',
    fontWeight: 400,
    fontFamily: "'Roboto', sans-serif",
  }

  useEffect(() => {
    // Tính tổng giá tiền khi giỏ hàng thay đổi
    calculateTotalPrice();
  }, [cartItems])

  const calculateTotalPrice = (orderItems) => {
    let totalPrice = 0;
    orderItems.forEach((item) => {
      totalPrice += item.total_price;
    });
    return totalPrice;
  };

  // const totalPrice = calculateTotalPrice(cartItems);
  const [totalPrice, setTotalPrice] = useState(calculateTotalPrice(cartItems));





  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    total_price:0,
    paymentMethod: "",
    notes: "",
  });
  console.log('Day la trang xac nhan')
  console.log(cartItems);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler =()=>{

  };

  const handlePaymentMethodChange = (e) => {
    setFormData({ ...formData, paymentMethod: e.target.value });
  };


  const handleCreateOrder = async (e) => {
    e.preventDefault();
    const orderData = {
      order:{
        Firstname: formData.firstName,
        Lastname: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        notes: formData.notes,
        paymentMethod: formData.paymentMethod,

      },
        items: cartItems      
    };
    console.log('Order Items');
    console.log(orderData);
    // Tạm thời bỏ qua để không ảnh hưởng đến dữ liệu
    // try {
    //   const response = await axios.post("http://localhost:8000/orders/create-order/", orderData);
    //   console.log("Order created:", response.data);
    //   // navigate(`/confirmation/${response.data.orderId}`);
    // } catch (error) {
    //   console.error("Error creating order:", error);
    // }
    
    response =await getOrder.post('orders/create-order/', orderData);
    console.log(response.data)
  };

  return (
    <section>
        <Container>
        <Row>
          <Row>
          <div className="container-fluid">
            <div className="row d-flex justify-content-between">
              <div className="col-12 col-lg-8 mt-5 order-confirm">
              <div className="shopping-cart">
                {/* <h4 className="mt-4">Your Cart Items:</h4>
                <hr /> */}
                <div class="title" style={styles}>
                    Shopping Bag
                  </div>
               

                {cartItems.map((item, index) => (
                  <ViewOrderItems 
                    item={item} 
                    key={item.id || index}
                    handleQuantityChange={(newQuantity) => {
                      addToCart({ ...item, quantity: newQuantity });
                    }}
                    handleRemove={() => removeFromCart(index)}  // Use item.id if available, otherwise fall back to index
                  />
                ))}
                {/* <hr /> */}

              </div>
                {/* <div className="col-span-2 sm:col-span-1">
                                      <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                      <input value={''} onChange={''} type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required=""/>
                                  </div> */}
              </div>
              <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                  <h4>Order Summary</h4>
                  <hr />
                  <p>Subtotal: <span className="order-summary-values">${totalPrice}</span></p>
                  <p>Shipping: <span className="order-summary-values">$25</span></p>
                  <p>Tax: <span className="order-summary-values">${totalPrice*0.1}</span></p>
                  <hr />
                  <p>Total: <span className="order-summary-values">${1.1*totalPrice+25}</span></p>
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
                        <input type="number" placeholder="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
                      </FormGroup>

                      {/* <FormGroup className="booking__form d-inline-block me-4 mb-4">
                        <input type="text" placeholder="From Address" />
                      </FormGroup> */}
                      <FormGroup className="address__input d-inline-block mb-4">
                        <input type="text" placeholder="To Address" name="address" value={formData.address} onChange={handleInputChange} />
                      </FormGroup>
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
                <h5 className="mb-4 fw-bold">Payment Information</h5>
                <div className="payment">
                  <label htmlFor="directBankTransfer" className="d-flex align-items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={formData.paymentMethod === "bank_transfer"}
                      onChange={handlePaymentMethodChange}
                    />
                    Direct Bank Transfer
                  </label>
                </div>
                <div className="payment mt-3">
                  <label htmlFor="chequePayment" className="d-flex align-items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cheque"
                      checked={formData.paymentMethod === "cheque"}
                      onChange={handlePaymentMethodChange}
                    />
                    Cheque Payment
                  </label>
                </div>
                <div className="payment mt-3 d-flex align-items-center justify-content-between">
                  <label htmlFor="masterCard" className="d-flex align-items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="mastercard"
                      checked={formData.paymentMethod === "mastercard"}
                      onChange={handlePaymentMethodChange}
                    />
                    Master Card
                  </label>
                  <img src={masterCard} alt="Master Card" />
                </div>
                <div className="payment mt-3 d-flex align-items-center justify-content-between">
                  <label htmlFor="paypal" className="d-flex align-items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === "paypal"}
                      onChange={handlePaymentMethodChange}
                    />
                    Paypal
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
