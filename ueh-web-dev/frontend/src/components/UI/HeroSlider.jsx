import React from "react";

import Slider from "react-slick";
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.css';
import { Container } from "reactstrap";
import { Link } from "react-router-dom";

import "../../styles/hero-slider.css";
// import "./node_modules/swiper/modules/effect-fade/effect-fade";


const HeroSlider = () => {
  return (
    <Swiper
    // fade={true} // Hiệu ứng fading
    speed={1000} // Tốc độ chuyển đổi (milliseconds)
    autoplay={{ // Tự động phát slide
      delay: 100, // Độ trễ giữa các lần trượt (milliseconds)
      disableOnInteraction: false, // Không tắt tự động trượt khi người dùng tương tác với trình trượt
    }}
    loop={true} // Lặp vô hạn các slide
    slidesPerView={3} // Số lượng slide hiển thị trên mỗi trang
    // spaceBetween={1} // Khoảng cách giữa các slide (pixels)
    className="hero__slider" // Lớp CSS cho Swiper container
  >
    

      <SwiperSlide>


        <div className="slider__item slider__item-01">
          <Container>
            <div className="slider__content ">
              <h4 className="text-light mb-3">For Rent $70 Per Day</h4>
              <h1 className="text-light mb-4">Reserve Now and Get 50% Off</h1>

              <button className="btn reserve__btn mt-4">
                <Link to="/cars">Reserve Now</Link>
              </button>
            </div>
          </Container>
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="slider__item slider__item-02 mt0">
          <Container>
            <div className="slider__content ">
              <h4 className="text-light mb-3">For Rent $70 Per Day</h4>
              <h1 className="text-light mb-4">Reserve Now and Get 50% Off</h1>

              <button className="btn reserve__btn mt-4">
                <Link to="/cars">Reserve Now</Link>
              </button>
            </div>
          </Container>
        </div>
        </SwiperSlide>

      <SwiperSlide>
        <div className="slider__item slider__item-03">
          <Container>
            <div className="slider__content ">
              <h4 className="text-light mb-3">For Rent $70 Per Day</h4>
              <h1 className="text-light mb-4">Reserve Now and Get 50% Off</h1>

              <button className="btn reserve__btn mt-4">
                <Link to="/cars">Reserve Now</Link>
              </button>
            </div>
          </Container>
        </div>
        </SwiperSlide>
  </Swiper>


    // </Slider>

  );
};

export default HeroSlider;
