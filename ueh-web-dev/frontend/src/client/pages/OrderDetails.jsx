import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ViewOrderItems from "../components/UI/ViewOrderItems";
import { Row, Container } from "reactstrap";
// import Container from "reactstrap";
import { useCart } from "../utils/cartContext";
import "../styles/booking-form.css";
// import "../styles/payment-method.css";
// import "../styles/cart-items.css"


const OrderDetails = () =>{
    const {cartItems} = useCart();
    const { orderId } = useParams();
    const [orderItems, setOrderItems] = useState([]);
    const navigate = useNavigate();
    const styles ={
      // width:'100vw',
      // marginLeft:'10px',
      height: '50px',
      // borderBottom: '1px solid #E1E8EE',
      padding: '0px 30px',
      color: '#5E6977	',
      fontSize: '20px',
      fontWeight: 400,
      fontFamily: "'Roboto', sans-serif",
      // marginBottom:'30px'
    }

    const fetchOrderItems = async () => {
          // Tạm thời bỏ qua để không ảnh hưởng đến dữ liệu

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

  const returnMainPage = () =>{
    navigate('/');
  }

    return(
      <Container>
      <Row>
      <div className="container-fluid">
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8 mt-5 order-confirm">
          {/* <div className="shopping-cart" style={{width:'55vw'}}> */}
            {/* <h4 className="mt-4">Your Cart Items:</h4>
            <hr /> */}
            <div className="title" style={styles}>
                <h4 className="mb-3" >Shipping Info</h4>

                <div >
                  <p><b>Name:</b> Ghulam Abbas</p>
                  <p><b>Phone:</b> 111 111 1111</p>
                  <p className="mb-4"><b>Address:</b> 2968, Oakwood Circle, DENVILLE, 07834, USA</p>

                </div>
                Shopping Bag
           

            

              </div>
            {/* <hr /> */}

          {/* </div> */}
            {/* <div className="col-span-2 sm:col-span-1">
                                  <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                  <input value={''} onChange={''} type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required=""/>
                              </div> */}
          </div>
          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>Subtotal: <span className="order-summary-values">${25}</span></p>
              <p>Shipping: <span className="order-summary-values">$25</span></p>
              <p>Tax: <span className="order-summary-values">${30*0.1}</span></p>
              <hr />
              <p>Total: <span className="order-summary-values">${1.1*30+25}</span></p>
              <hr />
              <button id="checkout_btn" className="btn btn-primary btn-block" onClick={returnMainPage}>Return to main pages</button>
            </div>
          </div>
        </div>
      </div>





        {/* <div className="container-fluid">
            <div className="row d-flex justify-content-between">
              <div className="col-12 col-lg-8 mt-5 order-confirm">
                <h4 className="mb-3">Shipping Info</h4>
                <p><b>Name:</b> Ghulam Abbas</p>
                <p><b>Phone:</b> 111 111 1111</p>
                <p className="mb-4"><b>Address:</b> 2968, Oakwood Circle, DENVILLE, 07834, USA</p>
                <hr />
                <h4 className="mt-4">Your Cart Items:</h4>
                <hr /> */}
                {/* <div className="cart-item my-1">
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
                </div> */}

                {/* {filteredCars.map((item) => (
                    <CarItem 
                    item={item} 
                    key={item.id} 
              // handleChangeColor={handleChangeColor} 
                    />
                ))} */}
                {/* <hr /> */}
                {/* <div className="col-span-2 sm:col-span-1">
                                      <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                      <input value={''} onChange={''} type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required=""/>
                                  </div> */}
              {/* </div>
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
                  <button id="checkout_btn" className="btn btn-primary btn-block" onClick={returnMainPage}>Return to main pages</button>
                </div>
              </div>
            </div>
          </div> */}
      </Row>
      <Row>
      <div className="title" style={styles}>
      Shopping bag
      </div>

      <div className="shopping-cart" style={{width:'55vw'}}>
      {cartItems.map((item, index) => (
              <ViewOrderItems 
                item={item} 
                key={item.id || index}
                // handleLikeClick={() => handleLikeClick(index)}
                isOrderDetail={true}
                // handleQuantityChange={(newQuantity) => {
                //   addToCart({ ...item, quantity: newQuantity });
                // }}
                // handleRemove={() => removeFromCart(index)}
                  // Use item.id if available, otherwise fall back to index
              />
            ))}
            </div>
      </Row>
      </Container>

    );

}

export default OrderDetails