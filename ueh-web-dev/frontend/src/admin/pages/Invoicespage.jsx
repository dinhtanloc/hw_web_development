import { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataInvoices } from "../assets/data/mockData";
import Header from "./Header";
import useAxios from "../../client/utils/useAxios";
import {Button} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


const Invoicespage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [orders, setOrders] = useState([]);


  const orderList = useAxios()

  useEffect(() => {
    fetchOrderList();
  }, []);

  const fetchOrderList = async () => {
      try {
          const response = await orderList.get('orders/admin/orders/');
          // setUserProfile(response.data);
          // checkStaff(response.data.is_staff)
      
          setOrders(response.data.results)
          
      } catch (error) {
          console.error('Error fetching user profile:', error);
      }
  };

  const completeOrder = async (orderId) => {
      try{
        const response = await orderList.post(`orders/admin/orders/${orderId}/complete/`);
          // setUserProfile(response.data);
          // checkStaff(response.data.is_staff)
       

      } catch(error){
        console.error('Error complete user order:', error);

      }
    };


    const cancelOrder = async (orderId) => {
      try{
        const response = await orderList.post(`orders/admin/orders/${orderId}/cancel/`);
          // setUserProfile(response.data);
          // checkStaff(response.data.is_staff)
     

      } catch(error){
        console.error('Error cancel user order:', error);

      }

  };

  const handleCompleteOrders = async () => {
    for (const orderId of selectedOrders) {
      await completeOrder(orderId);
    }
    // Fetch the updated order list
    fetchOrderList();
  };

  const handleCancelOrders = async () => {
   
    for (const orderId of selectedOrders) {
      await cancelOrder(orderId);
    }
    // Fetch the updated order list
    fetchOrderList();
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "Firstname",
      headerName: "First name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Lastname",
      headerName: "Last name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "total_price",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.total_price}
        </Typography>
      ),
    },
    {
      field: "payment_method",
      headerName: "Payment",
      flex: 1,
    },
    {
      field: "shipping_deadline",
      headerName: "Ship date",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        if (params.row.status === "completed") {
          return <CheckCircleIcon style={{ color: "green" }} />;
        } else if (params.row.status === "cancelled") {
          return <CancelIcon style={{color:"red"}}/>;
        } else {
          return <Typography color="gray">Chờ</Typography>;; // Nếu status là 'pending' thì không hiển thị gì
        }
      },
    },
  ];

  const columnNames = columns.map(column => column.field);
    
  // Lọc mockDataContacts để chỉ giữ lại các keys có trong columnNames
  const OrderFilterlist = orders.map(contact =>
    Object.keys(contact).reduce((acc, key) => {
      if (columnNames.includes(key)) {
        acc[key] = contact[key];
      }
      return acc;
    }, {})
  );

  return (
    <Box m="20px">
      <Header title="INVOICES" subtitle="List of Invoice Balances" />
      <Box mb="20px">
        <Button variant="contained" color="primary" onClick={handleCompleteOrders}>
          Complete Selected Orders
        </Button>
        <Button variant="contained" color="secondary" onClick={handleCancelOrders}>
          Cancel Selected Orders
        </Button>
      </Box>
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
        }}
      >
        <DataGrid 
        rows={OrderFilterlist} 
        columns={columns}
        checkboxSelection 
     
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setSelectedOrders(newRowSelectionModel);
        }}
        rowSelectionModel={selectedOrders}
          // {...data}
        />
      </Box>
    </Box>
  );
};

export default Invoicespage;
