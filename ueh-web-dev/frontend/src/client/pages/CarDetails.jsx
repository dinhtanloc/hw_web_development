import React, { useEffect, useState } from "react";
import axios from "axios";

import carData from "../assets/data/carData";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";
import { useCart } from "../utils/cartContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";  
import Contact from './Contact'
const CarDetails = () => {
  const { slug } = useParams();
  const { addToCart,cartItems } = useCart();
  const [selectedColor, setSelectedColor] = useState("");
  const singleCarItem = carData.find((item) => item.carName === slug);
  const [changecolorImage, setSelectedCar]=useState(singleCarItem.imgUrl)
  const [quantity, setQuantity] = useState(singleCarItem.quantity || 1); // Sử dụng state để quản lý giá trị quantity
  const navigate = useNavigate();



  const handleColorChange = async (e) => {
    const newColor = e.target.value;
    setSelectedColor(newColor);
    try {
      const response = await axios.post(
        `http://localhost:8000/categories/${singleCarItem.id}/change-color/`,
        {
          carName: singleCarItem.carName,
          color: newColor,
        }
      );
      setSelectedCar(response.data.response);
    } catch (error) {
      console.error("There was an error changing the color!", error);
    }
  };

  const handleAddToCart = () => {
    const newItem = {
      carName: singleCarItem.carName,
      unit_price: singleCarItem.price,
      quantity: quantity,
      // color: selectedColor,
      color: "white",
      imgUrl: changecolorImage,
      total_price: quantity *singleCarItem.price,
      product:singleCarItem.id
    };
    addToCart(newItem);
    console.log('Moi them don hang moi')
    console.log(cartItems)
    Swal.fire({
      title: "Add Successful",
      icon: "success",
      toast: true,
      timer: 6000,
      position: 'top-right',
      timerProgressBar: true,
      showConfirmButton: false,
  })
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [singleCarItem]);

  return (
    <Helmet title={singleCarItem.carName}>
      <section>
        <Container>
          <Row>
          <div style={{marginTop:"30px"}}></div>

            <Col lg="6">
              <img src={changecolorImage} alt="" className="w-100" />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{singleCarItem.carName}</h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    ${singleCarItem.price}
                  </h6>

                  <span className=" d-flex align-items-center gap-2">
                    <span style={{ color: "#f9a826" }}>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    ({singleCarItem.rating} ratings)
                  </span>
                </div>
                  <select
                    value={selectedColor}
                    onChange={handleColorChange}
                    className="w-100"
                  >
                    <option className="black-option" value="black">Black</option>
                    <option className="white-option" value="white">White</option>
                    <option className="red-option" value="red">Red</option>
                  </select>

                  {/* <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                      <input value={singleCarItem.quantity} onChange={(e) => setQuantity(Number(e.target.value))}  type="number" name="quantity" id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Quantity" required=""/>
                  </div>  */}

                <p className="section__description">
                  {singleCarItem.description}
                </p>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-roadster-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {singleCarItem.model}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-settings-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {singleCarItem.automatic}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-timer-flash-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {singleCarItem.speed}
                  </span>
                </div>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "2.8rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i className="ri-map-pin-line" style={{ color: "#f9a826" }}></i>{" "}
                    {singleCarItem.gps}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-wheelchair-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {singleCarItem.seatType}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-building-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {singleCarItem.brand}
                  </span>
                </div>
                <button onClick={handleAddToCart}>Add to Cart</button>

              </div>
            </Col>

            {/* <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold ">Booking Information</h5>
                <BookingForm />
              </div>
            </Col>

            <Col lg="5" className="mt-5">
              <div className="payment__info mt-5">
                <h5 className="mb-4 fw-bold ">Payment Information</h5>
                <PaymentMethod
                orderData={orderData}
                itemsData={itemsData} />
              </div>
            </Col> */}
          <div style={{marginBottom:'30px'}}></div>
          </Row>
          {/* <Contact/> */}
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
