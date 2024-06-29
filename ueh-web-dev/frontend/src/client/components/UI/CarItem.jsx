import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
import { useNavigate } from "react-router-dom";

const CarItem = (props) => {
  const { imgUrl, model, carName, automatic, speed, price } = props.item;
  const navigate = useNavigate()

  const gotoProductPage = () =>{
    navigate(`/cars/${props.item.id}`)

  };

  const PUBLIC_URL='../../../public'
  
  const filePath = `${PUBLIC_URL}${imgUrl}`;

  // const hello = `../${carName}`; // Tạo đường dẫn tương đối cho ảnh


  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img style={{backgroundColor:'white', width:'400px',height:'213px'}} src={imgUrl} alt="" className="w-100" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{carName}</h4>
          <h6 className="rent__price text-center mt-">
            ${price.toLocaleString('de-DE')}
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-car-line"></i> {model}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-settings-2-line"></i> {automatic}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-timer-flash-line"></i> {speed}
            </span>
          </div>

          {/* <select
            onChange={(e) => handleChangeColor(item.id,carName, e.target.value)}
            className="w-100"
          >
            <option className="black-option" value="red"></option>
            <option className="white-option" value="green"></option>
            <option className="red-option" value="yellow"></option>
          </select> */}

          <button className=" w-50 car__item-btn car__btn-rent">
            <Link to={`/cars/${props.item.id}`}>Buy</Link>
          </button>

          <button className=" w-50 car__item-btn car__btn-details" onClick={gotoProductPage}>
            {/* <Link to={`/cars/${carName}`}>Details</Link> */}
            <span>Details</span>
            
          </button>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
