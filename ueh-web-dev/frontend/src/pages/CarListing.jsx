import {React, useState} from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import carData from "../assets/data/carData";

const CarListing = ({searchTerm}) => {
  const [sortBy, setSortBy] = useState(""); // Trạng thái lưu trữ cách sắp xếp

  // Hàm để sắp xếp danh sách xe dựa trên giá
  const sortCarsByPrice = (cars, order) => {
    return cars.sort((a, b) => {
      if (order === "low") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  };

  // console.log('bibi');
  // console.log(searchTerm);
  // if(car.name.toString().toLowerCase().includes(searchTerm.toLowerCase())){
  //   console.log('đã tìm ra')
  // }
  // console.log(car.name);
  
  const filteredCars = searchTerm
  ? carData.filter((car) =>{
    const match =car.carName && car.carName.toLowerCase().includes(searchTerm.toLowerCase());
    // console.log(car.carName);
    // console.log('hello')
    // console.log(match);
    return match;
  }
)
: carData;
  console.log(searchTerm);
  console.log(filteredCars)
  const sortedCars = sortBy ? sortCarsByPrice(filteredCars, sortBy) : filteredCars;

  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  <i className="ri-sort-asc"></i> Sort By
                </span>

                <select onChange={(e) => setSortBy(e.target.value)}>
                  <option>Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div>
            </Col>

            {filteredCars.map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
