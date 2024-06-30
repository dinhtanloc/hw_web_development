import { useEffect, useState } from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "./Header";
import useAxios from "../../client/utils/useAxios";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import '../styles/invoices-page.css'; 

const Invoicespage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingOrderId, setLoadingOrderId] = useState(null);

  const orderList = useAxios();

  useEffect(() => {
    fetchOrderList();
  }, []);

  const fetchOrderList = async () => {
    try {
      const response = await orderList.get('orders/admin/orders/');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const completeOrder = async (orderId) => {
    setLoadingOrderId(orderId); 
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    try {
      const response = await orderList.post(`orders/admin/orders/${orderId}/complete/`);
      setLoadingOrderId(null); 
      fetchOrderList();
    } catch (error) {
      setLoadingOrderId(null); 
      console.error('Error completing order:', error);
    }
  };

  const cancelOrder = async (orderId) => {
    setLoadingOrderId(orderId); 
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    try {
      const response = await orderList.post(`orders/admin/orders/${orderId}/cancel/`);
      setLoadingOrderId(null); 
      fetchOrderList();
    } catch (error) {
      setLoadingOrderId(null); 
      console.error('Error canceling order:', error);
    }
  };

  const handleCompleteOrders = async () => {
    for (const orderId of selectedOrders) {
      await completeOrder(orderId);
    }
  };

  const handleCancelOrders = async () => {
    for (const orderId of selectedOrders) {
      await cancelOrder(orderId);
    }
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
      field: "phoneNumber",
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
          ${params.row.total_price.toLocaleString('de-DE')}
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
        if (params.row.id === loadingOrderId) {
          return <HourglassBottomIcon className="slowBlink" style={{ color: 'gray' }} />;
        } else if (params.row.status === "completed") {
          return <CheckCircleIcon style={{ color: "green" }} />;
        } else if (params.row.status === "cancelled") {
          return <CancelIcon style={{color:"red"}}/>;
        } else {
          return <HourglassBottomIcon style={{ color: 'gray' }} />;
        }
      },
    },
  ];

  const columnNames = columns.map(column => column.field);

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
        height="60vh"
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
        />
      </Box>
    </Box>
  );
};

export default Invoicespage;
