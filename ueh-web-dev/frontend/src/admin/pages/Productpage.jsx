import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import useAxios from "../../client/utils/useAxios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const [products, setProducts] = useState([]);
  const [editRowIndex, setEditRowIndex] = useState(null);
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
    const rowIndex = params.id;
    setEditRowIndex(rowIndex);
  };

  const GotoAddproductPage = () => {
    navigate("create-products/");
  };

  const updateProduct = async (product) => {
    try {
      const response = await productList.patch(
        `categories/admin/products/${product.id}/`,
        product
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
      const updatedProduct = await updateProduct(products[editRowIndex]);
      const updatedProducts = [...products];
      updatedProducts[editRowIndex] = updatedProduct;
      setProducts(updatedProducts);
      setEditRowIndex(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "brand", editable: true, headerName: "Brand", flex: 1, cellClassName: "name-column--cell" },
    { field: "carName", editable: true, headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "model", editable: true, headerName: "Model", flex: 1, cellClassName: "name-column--cell" },
    { field: "price", editable: true, headerName: "Price", type: "number", headerAlign: "left", align: "left" },
    { field: "speed", editable: true, headerName: "Speed", flex: 1 },
    { field: "gps", editable: true, headerName: "GPS", flex: 1 },
    { field: "seatType", editable: true, headerName: "Seat Type", flex: 1 },
    { field: "automatic", editable: true, headerName: "Automatic", flex: 1 },
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
      {console.log(products)}
        <DataGrid
          key={products.length} // Ensure DataGrid updates when products change
          rows={products}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onCellDoubleClick={handleCellDoubleClick}
          editRowsModel={{
            id: editRowIndex,
          }}
        />
      </Box>

      {editRowIndex !== null && (
        <Button variant="contained" color="primary" onClick={handleSaveChanges}>
          Save
        </Button>
      )}

      <Button variant="contained" color="primary" onClick={GotoAddproductPage}>
        Add
      </Button>
    </Box>
  );
};

export default ProductPage;
