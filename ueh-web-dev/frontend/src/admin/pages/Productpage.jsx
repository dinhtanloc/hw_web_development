import React, { useEffect, useState, useCallback } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import useAxios from "../../client/utils/useAxios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const ProductPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const [products, setProducts] = useState([]);
  const [updatedProduct, setUpdatedProduct] = useState(null);
  const productList = useAxios();
 
  useEffect(() => {
    fetchProductList();
  }, []);

  const fetchProductList = async () => {
    try {
      const response = await productList.get("categories/admin/products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  const handleCellDoubleClick = (params) => {
    const rowIndex = params.id - 1; 
    setUpdatedProduct(products[rowIndex]);
  };
  const updateProduct = async (product) => {
    try {
      console.log('patch',product)
      const { imgUrl, ...productWithoutImgUrl } = product;
      const response = await productList.patch(
        `categories/admin/products/${product.id}/`,
        productWithoutImgUrl
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await productList.delete(`categories/admin/products/${productId}/`);
      const updatedProducts = products.filter((product) => product.id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      if (updatedProduct !== null) {
        const updatedProductData = await updateProduct(updatedProduct);
        const updatedProducts = products.map((product) =>
          product.id === updatedProductData.id ? updatedProductData : product
        );
        setProducts(updatedProducts);
        setUpdatedProduct(null);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleCancelChanges = () => {
    setUpdatedProduct(null);
  };

  const handleProcessRowUpdateError = (error) => {
    console.error('Row update error: ', error);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "brand", editable: true, headerName: "Brand", flex: 1, cellClassName: "name-column--cell" },
    { field: "carName", editable: true, headerName: "Name", flex: 2, cellClassName: "name-column--cell" },
    { field: "model", editable: true, headerName: "Model", flex: 1, cellClassName: "name-column--cell" },
    { field: "price", editable: true, headerName: "Price", type: "number", headerAlign: "left", align: "left" },
    { field: "speed", editable: true, headerName: "Speed", flex: 1 },
    { field: "gps", editable: true, headerName: "GPS", flex: 1 },
    { field: "seatType", editable: true, headerName: "Seat Type", flex: 1 },
    { field: "automatic", editable: true, headerName: "Automatic", flex: 1 },
    { field: "quantity", editable: true, headerName: "Quantity", flex: 1 },
    {
      field: "delete",
      headerName: "Delete",
      renderCell: (params) => (
        <Button variant="contained" color="error" onClick={() => deleteProduct(params.row.id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Products" subtitle="Inventory category out of stock" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={products}
          columns={columns}
          editMode="row"
          components={{ Toolbar: GridToolbar }}
          onCellDoubleClick={handleCellDoubleClick}
          processRowUpdate={(updatedRow) => {
            console.log(updatedRow);
            setUpdatedProduct(updatedRow);
            return updatedRow;
          }}
          onProcessRowUpdateError={handleProcessRowUpdateError}
        />
      </Box>

      {updatedProduct !== null && (
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleSaveChanges} style={{ marginRight: "0.5%" }}>
            Save
          </Button>
          <Button variant="contained" color="secondary" onClick={handleCancelChanges} style={{ marginRight: "0.5%" }}>
            Cancel
          </Button>
        </Box>
      )}

      
    </Box>
  );
};

export default ProductPage;
