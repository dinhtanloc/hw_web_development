import React, {useState, useEffect} from "react";
import useAxios from "../../client/utils/useAxios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Box, TextField, Button } from "@mui/material";

const Addproduct = () => {
    const productList = useAxios()
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
    const [newProductData, setNewProductData] = useState({
        brand: "",
        carName: "",
        model: "",
        price: "",
        speed: "",
        gps: "",
        seatType: "",
        automatic: "",
      });

    const ReturnProductPage = () => {
    navigate('/products'); // Điều hướng đến trang '/other-page' khi bấm nút
    };


    const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProductData({ ...newProductData, [name]: value });
    };


    const handleAddProduct = async () => {
    try {
        const response = await productList.post('categories/admin/products/', newProductData);
        const newProduct = response.data;
        setProducts([...products, newProduct]);
        setNewProductData({
        brand: "",
        carName: "",
        model: "",
        price: "",
        speed: "",
        gps: "",
        seatType: "",
        automatic: "",
        });
    } catch (error) {
        console.error('Error adding product:', error);
    }
    };

    return (
    <Box mt={2}>
        <TextField
          name="brand"
          label="Brand"
          value={newProductData.brand}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          name="carName"
          label="Name"
          value={newProductData.carName}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          name="model"
          label="Model"
          value={newProductData.model}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          name="price"
          label="Price"
          value={newProductData.price}
          onChange={handleInputChange}
          variant="outlined"
        />
        {/* Add more text fields for other product attributes */}
        <Button variant="contained" onClick={handleAddProduct}>Add Product</Button>
        <Button variant="contained" onClick={ReturnProductPage}>Return Page</Button>
      </Box>
      );

}

export default Addproduct;