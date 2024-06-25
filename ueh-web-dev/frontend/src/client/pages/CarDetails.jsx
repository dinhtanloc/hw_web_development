import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/car-detail.css"

import carData from "../assets/data/carData";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";
import { useCart } from "../utils/cartContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";  
import RadioButton from "../components/UI/RadioButton";
import AboutSection from "../components/UI/AboutSection";
import ServicesList from "../components/UI/ServicesList";
import Testimonial from "../components/UI/Testimonial";
import BlogList from "../components/UI/BlogList";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";
import Contact from './Contact'
const CarDetails = () => {
  const { slug } = useParams();
  const { addToCart,cartItems } = useCart();
  const [selectedColor, setSelectedColor] = useState("");
  const [product, setProduct] = useState([]);
  // const [color, defaultColor]=useState("")
  const [price, setPrice] =useState(0);
  const navigate = useNavigate();
  // const product = carData.find((item) => item.id == slug);
  // const [carData, setCarData] = useState("");
  const [changecolorImage, setSelectedCar]=useState("")
  const [quantity, setQuantity] = useState(1); // Sử dụng state để quản lý giá trị quantity


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/categories/${slug}/`);
       
        setProduct(response.data);
        // defaultColor(response.data.imgUrl)
        const initialColor = ColorDefault(response.data.imgUrl);
        setPrice(response.data.price)
        setSelectedColor(initialColor)
        setSelectedCar(response.data.imgUrl)
        setQuantity(response.data.quantity)
        setTheme({ red: initialColor === "red", white: initialColor === "white", black: initialColor === "black" });
      } catch (error) {
        console.error('Error fetching product detail:', error);
      }
    };

    fetchProduct();
  }, [slug]);

  const ColorDefault = (imgUrl) =>{
    const parts = imgUrl.split("_"); // Tách chuỗi bởi dấu '_'
    const colorWithExtension = parts[parts.length - 1]; // Lấy phần tử cuối cùng
    const color = colorWithExtension.split(".")[0]; // Tách phần mở rộng file và lấy màu sắc
    return color


  }



  const handleColorChange = async (e) => {
    const newColor = e.target.value;
    setSelectedColor(newColor);
    setTheme({ red: false, white: false, black: false, [newColor]: true });
    try {
      const response = await axios.post(
        `http://localhost:8000/categories/${product.id}/change-color/`,
        {
          carName: product.carName,
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
      carName: product.carName,
      unit_price: product.price,
      quantity: quantity,
      color: selectedColor,
      // color: "white",
      imgUrl: changecolorImage,
      total_price: quantity *product.price,
      product:product.id
    };
    addToCart(newItem);

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
  }, [product]);

  const [theme, setTheme] = useState({ red: false, white: false, black:false })


  const onChangeTheme = async (e) => {
    const { name } = e.target
    setTheme({ red: false, white: false, black: false, [value]: true });
    setSelectedColor(name);
    try {
      const response = await axios.post(
        `http://localhost:8000/categories/${product.id}/change-color/`,
        {
          carName: product.carName,
          color: name,
        }
      );
      setSelectedCar(response.data.response);
    } catch (error) {
      console.error("There was an error changing the color!", error);
    }
  }

  return (
    <Helmet title={product.carName}>
      <section>
        <Container>
          <Row>
          <div style={{marginTop:"30px"}}></div>

            <Col lg="6">
              <img src={changecolorImage} style={{width:'480px',height:'424px'}} alt="" className="w-100" />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{product.carName}</h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    ${price.toLocaleString('de-DE')}
                  </h6>

                  <span className=" d-flex align-items-center gap-2">
                    <span style={{ color: "#f9a826" }}>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    ({product.rating} ratings)
                  </span>
                </div>
                  {/* <select
                    style={{backgroundColor:"gray"}}
                    value={selectedColor}
                    onChange={handleColorChange}
                    // className="w-100"
                  >
                  
                    <option className="black-option" value="black">Black</option>
                    <option className="white-option" value="white">White</option>
                    <option className="red-option" value="red">Red</option>
                  </select> */}

                  <RadioButton
                      name="colorTheme"
                      id="red"
                      value="red"
                      text="Red"
                      onChange={handleColorChange}
                      checked={selectedColor === "red"}
                    />
                    <RadioButton
                      name="colorTheme"
                      id="white"
                      value="white"
                      text="White"
                      onChange={handleColorChange}
                      checked={selectedColor === "white"}
                    />
                    <RadioButton
                      name="colorTheme"
                      id="black"
                      value="black"
                      text="Black"
                      onChange={handleColorChange}
                      checked={selectedColor === "black"}
                    />

                  {/* <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                      <input value={product.quantity} onChange={(e) => setQuantity(Number(e.target.value))}  type="number" name="quantity" id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Quantity" required=""/>
                  </div>  */}

                <p className="section__description">
                  {product.description}
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
                    {product.model}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-settings-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {product.automatic}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-timer-flash-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {product.speed}
                  </span>
                </div>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "2.8rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i className="ri-map-pin-line" style={{ color: "#f9a826" }}></i>{" "}
                    {product.gps}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-wheelchair-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {product.seatType}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-building-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {product.brand}
                  </span>
                </div>
                <button className="button_details" onClick={handleAddToCart}>Add to Cart</button>

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
              {/* <AboutSection/> */}
          </Row>
          {/* <Contact/> */}
          <Row style={{marginTop:'10%', marginBottom:"10%"}}>
            <Col lg="12" className="mb-4 text-center">
              <h6 className="section__subtitle">Why you choose us?</h6>
              <h2 className="section__title">Services List</h2>
            </Col>
            <ServicesList/>

          </Row>
          <Row>
            <BecomeDriverSection/>
          </Row>
          <section>
        <Container>
          <div style={{marginBottom:'2%'}}></div>
          <Row>
            <Col lg="12" className="mb-4 text-center">
              <h6 className="section__subtitle">Our clients says</h6>
              <h2 className="section__title">Testimonials</h2>
            </Col>

            <Testimonial />
          </Row>
        </Container>
      </section>

    
          
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
