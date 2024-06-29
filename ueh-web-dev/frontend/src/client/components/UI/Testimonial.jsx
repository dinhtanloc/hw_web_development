import React from "react";
import Slider from "react-slick";

import "../../styles/testimonial.css";

import ava01 from "/media/Loc_Dinh.jpg"
import ava02 from "/media/ban_xoi.jpg";
import ava03 from "/media/IT_Ando.jpg";
import ava04 from "/media/Ha_Lan.jpg";

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3">
        <p className="section__description">
        The service at this luxury car dealership is unparalleled. From the moment you walk in, you are treated like royalty. The staff is knowledgeable, friendly, and eager to help you find the perfect vehicle that suits your lifestyle and preferences.
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={ava01} alt="" className="w-25 h-25 rounded-2"  />

          <div>
            <h6 className="mb-0 mt-3">Tấn Lộc</h6>
            <p className="section__description">Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section__description">
        An exceptional experience awaits you at this official premium car dealership. The showroom is immaculate, and the collection of vehicles is simply stunning. The sales team is professional and attentive, ensuring that every detail is taken care of.
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={ava02} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">Bà bán xôi</h6>
            <p className="section__description">Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section__description">
        This luxury car dealership sets the standard for excellence. The attention to detail in every aspect of the service is remarkable. Whether you're purchasing a new car or getting your current one serviced, you can expect top-notch treatment from start to finish.
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={ava03} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">Anh IT Ấn Độ</h6>
            <p className="section__description">Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section__description">
        From the elegant showroom to the exceptional customer service, this premium car dealership is second to none. The staff goes above and beyond to ensure that your car-buying experience is smooth and enjoyable. I couldn't be happier with my new vehicle
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={ava04} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">Cô gái Hà Lan</h6>
            <p className="section__description">Customer</p>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Testimonial;
