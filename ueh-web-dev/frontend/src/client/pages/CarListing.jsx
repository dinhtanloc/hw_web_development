import {React, useState,useEffect} from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
// import carData from "../assets/data/carData";
import axios from "axios";
import {Pagination, Button} from "@nextui-org/react";
import { useLocation } from "react-router-dom";


const CarListing = ({searchTerm}) => {
  const { state } = useLocation(); 
  const [sortBy, setSortBy] = useState(""); // Trạng thái lưu trữ cách sắp xếp
  const [carData, setCardata] = useState([]);
  const [stateProducts, setStateProducts] = useState(state && state.products ? state.products : null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const carList = axios.create({
    baseURL: import.meta.env.VITE_DOMAIN_BACKEND
  });
  
  useEffect(() => {
    fetchCars(currentPage, sortBy, searchTerm);
  }, [currentPage, sortBy, searchTerm]);
 
              
    const fetchCars = async (page, sort, search) => {
      try {
        const response = await carList.get('/categories/', {
          params: {
            page: page,
            sort: sort,
            search: search,
          },
        });

      //   const cardata=stateProducts
      // ? response.data.results.filter((car) =>
      //   stateProducts.some((product) => product.carName === car.carName)
      //   )
      // : response.data.results

      let filteredCars = response.data.results;

      if (stateProducts) {
        filteredCars = filteredCars.filter((car) =>
          stateProducts.some((product) => product.carName === car.carName)
        );
      }
        setCardata(filteredCars);
        // location.state.products?setCardata(location.state.products):setCardata(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 9)); 
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };
    
    
    const sortCarsByPrice = (cars, order) => {
      return cars.sort((a, b) => {
        if (order === "low") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    };
    
    const handleChangeColor = (productId,carName, color) => {
      carList
      .post(`/categories/${productId}/change-color/`, {
        carName:carName,
        color: color,
      })
      .then((response) => {
        // Xử lý phản hồi từ backend nếu cần
        console.log(response)
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
      });
    };
    
    const resetCars = () => {
      setCurrentPage(1); 
      setSortBy(''); 
      // setSearchTerm(''); 
      fetchCars(1, '', ''); 
      setStateProducts(null);
      
    };
    
    const filteredCars = searchTerm
    ? (
      carData.filter((car) =>{
      const match =car.carName && car.carName.toLowerCase().includes(searchTerm.toLowerCase());
  
      return match;
    }
  ))
  : (carData);

  
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

            {sortedCars.map((item) => (
              <CarItem 
              item={item} 
              key={item.id} 
              // handleChangeColor={handleChangeColor} 
              />
            ))}
          </Row>
          <Button
                  size="sm"
                  variant="flat"
                  color="warning"
                  onClick={resetCars}
                >
                  Reset Filter
                </Button>
          <Row>
            <Col lg="12" className="d-flex justify-content-center mt-4">
              <div className="flex flex-col gap-5">
              <p className="text-small text-default-500" style={{paddingLeft:'15%'}}>Selected Page: {currentPage}</p>
                <Pagination
                  total={totalPages}
                  color="warning"
                  page={currentPage}
                  onChange={setCurrentPage}
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="flat"
                    color="warning"
                    onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
                  >
                    Previous
                  </Button>
                  <Button
                    size="sm"
                    variant="flat"
                    color="warning"
                    onPress={() => setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))}
                  >
                    Next
                  </Button>
                </div>

              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
