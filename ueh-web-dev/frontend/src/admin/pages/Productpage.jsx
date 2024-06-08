import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataContacts } from "../assets/data/mockData";
import Header from "./Header";
import { useTheme } from "@mui/material";
import useAxios from "../../client/utils/useAxios";
import {Button} from "@mui/material";
import { useNavigate } from "react-router-dom";


const ProductPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const[products,setProducts] = useState([]);
  const [editRowIndex, setEditRowIndex] = useState(null);
  


  const productList = useAxios()

  useEffect(() => {
    fetchProductList();
  }, []);

  const handleCellDoubleClick = (params) => {
    const rowIndex = params.id;
    setEditRowIndex(rowIndex);
  };

  const GotoAddproductPage = () => {
    navigate('/create-producrs'); // Điều hướng đến trang '/other-page' khi bấm nút
    };


  const fetchProductList = async () => {
      try {
          const response = await productList.get('categories/admin/products/');
          // setUserProfile(response.data);
          // checkStaff(response.data.is_staff)
          console.log('meomeo')
          console.log(response)
          setProducts(response.data);
          
          // console.log(checkedStaff)
      } catch (error) {
          console.error('Error fetching user profile:', error);
      }
  };

  const updateProduct = async (product) => {
    try {
      const response = await productList.patch(`categories/admin/products/${product.id}/`, product);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await productList.delete(`categories/admin/products/${productId}/`);
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
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
      console.error('Error updating product:', error);
    }
  };

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setNewProductData({ ...newProductData, [name]: value });
  // };


  // const handleAddProduct = async () => {
  //   try {
  //     const response = await productList.post('categories/admin/products/', newProductData);
  //     const newProduct = response.data;
  //     setProducts([...products, newProduct]);
  //     setNewProductData({
  //       brand: "",
  //       carName: "",
  //       model: "",
  //       price: "",
  //       speed: "",
  //       gps: "",
  //       seatType: "",
  //       automatic: "",
  //     });
  //   } catch (error) {
  //     console.error('Error adding product:', error);
  //   }
  // };

  
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    // { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "brand",
      headerName: "Brand",
      flex: 1,
      cellClassName: "name-column--cell",
      },
      {
        field: "carName",
        headerName: "Name",
        flex: 1,
        cellClassName: "name-column--cell",
        },
        {
          field: "model",
          headerName: "Model",
          flex: 1,
          cellClassName: "name-column--cell",
          },
          {
            field: "price",
            headerName: "Price",
            type: "number",
            headerAlign: "left",
            align: "left",
            },
            {
              field: "speed",
              headerName: "Speed",
              flex: 1,
              },
              {
                field: "gps",
                headerName: "GPS",
                flex: 1,
                },
                {
                  field: "seatType",
                  headerName: "Seat Type",
                  flex: 1,
                  },
                  {
                    field: "automatic",
      headerName: "Automatic",
      flex: 1,
      },
      {
        field: "delete",
        headerName: "Delete",
        renderCell: (params) => (
          <Button variant="contained" color="error" onClick={() => handleDeleteProduct(params.row.id)}>Delete</Button>
        ),
      },
      ];

      const columnNames = columns.map(column => column.field);
    
      // Lọc mockDataContacts để chỉ giữ lại các keys có trong columnNames
      const filteredMockData = products.map(contact =>
        Object.keys(contact).reduce((acc, key) => {
          if (columnNames.includes(key)) {
            acc[key] = contact[key];
          }
          return acc;
        }, {})
      );
      
      return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
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
          rows={filteredMockData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onCellDoubleClick={handleCellDoubleClick}
          editRowsModel={{
            id: editRowIndex,
            mode: "row",
          }}
        />
      </Box>

      {editRowIndex !== null && (
        <button onClick={handleSaveChanges}>Lưu</button>
      )}

      <button onClick={GotoAddproductPage}>Add</button>
    </Box>
  );
};

export default ProductPage;
