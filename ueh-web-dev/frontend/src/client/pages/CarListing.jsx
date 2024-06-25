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
  
  useEffect(() => {
    fetchCars(currentPage, sortBy, searchTerm);
  }, [currentPage, sortBy, searchTerm]);
 
              
              const fetchCars = async (page, sort, search) => {
                try {
                  const response = await axios.get('http://localhost:8000/categories/', {
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
                  setTotalPages(Math.ceil(response.data.count / 9)); // Giả sử mỗi trang có 5 sản phẩm
                } catch (error) {
                  console.error("There was an error fetching the data!", error);
                }
              };
              
              
              
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
              
              const handleChangeColor = (productId,carName, color) => {
                axios
                .post(`http://localhost:8000/categories/${productId}/change-color/`, {
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
                setCurrentPage(1); // Đặt lại trang hiện tại về 1
                setSortBy(''); // Đặt lại cách sắp xếp
                // setSearchTerm(''); // Đặt lại từ khóa tìm kiếm
                fetchCars(1, '', ''); // Gọi API để lấy danh sách xe ban đầu
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
                  color="secondary"
                  onClick={resetCars}
                >
                  Reset Filter
                </Button>
          <Row>
            <Col lg="12" className="d-flex justify-content-center mt-4">
              <div className="flex flex-col gap-5">
              <p className="text-small text-default-500">Selected Page: {currentPage}</p>
                <Pagination
                  total={totalPages}
                  color="secondary"
                  page={currentPage}
                  onChange={setCurrentPage}
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="flat"
                    color="secondary"
                    onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
                  >
                    Previous
                  </Button>
                  <Button
                    size="sm"
                    variant="flat"
                    color="secondary"
                    onPress={() => setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))}
                  >
                    Next
                  </Button>
                </div>

              </div>
              {/* <Pagination
                total={totalPages}
                color="secondary"
                page={currentPage}
                onChange={handlePageChange}
              />
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  variant="flat"
                  color="secondary"
                  onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
                >
                  Previous
                </Button>
                <Button
                  size="sm"
                  variant="flat"
                  color="secondary"
                  onPress={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
                >
                  Next
                </Button>
              </div> */}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
