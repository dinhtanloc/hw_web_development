import React, { useEffect, useContext,useState } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import InventoryIcon from '@mui/icons-material/Inventory';
import Header from "./Header";
import {SummaryLineChart} from "../components/UI/LineChart";
import GeographyChart from "../components/UI/GeographyChart";
import BarChart from "../components/UI/BarChart";
import StatBox from "../components/UI/StatBox";
import ProgressCircle from "../components/UI/ProgressCircle";
import useAxios from "../../client/utils/useAxios"
import RecentTransactions from "../components/UI/RecentTransactions";
import numeral from 'numeral';

// import downloadExcel from "../utils/downloadExcel";

const Dashboard = () => {
  // window.location.reload()
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [OrderInfo, checkOrderInfo] = useState([]);
  const [ProductInfo, checkProductInfo] = useState([]);
  const [orderRecent,setorderRecent] = useState([]);
  const api = useAxios();
  
  useEffect(() => {
    fetchTotalOrder();
    fetchProductInventory();
    fetchOrderList();
  }, []);

  const fetchOrderList = async () => {
    try {
        const response = await api.get('orders/admin/orders/first-ten-orders');
        const orders = response.data;
        const firstFiveOrders = orders.slice(0, 5);
        setorderRecent(firstFiveOrders)
        
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
};
  
  const fetchTotalOrder = async () => {
      try {
          const response = await api.get('orders/admin/orders/total-order/');
          // setUserProfile(response.data);
          // checkStaff(response.data.is_staff)
          console.log(response.data)
          checkOrderInfo(response.data)
          
          
      } catch (error) {
          console.error('Error fetching user profile:', error);
      }
  };

  const fetchProductInventory = async () => {
      try {
          const response = await api.get('categories/admin/products/check_inventory/');
          // setUserProfile(response.data);
          // checkStaff(response.data.is_staff)
          checkProductInfo(response.data)
          console.log(ProductInfo)
          
          // console.log(checkedStaff)
      } catch (error) {
          console.error('Error fetching user profile:', error);
      }
  };




  const handleDownload = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_DOMAIN_BACKEND}/orders/download-excel/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'orders.xlsx');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    } catch (error) {
        console.error('Error downloading the file', error);
    }
};
  



 
  
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick = {handleDownload}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Data
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="128px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={numeral(OrderInfo.total_revenue).format('0.00a $')}
            subtitle="Total sale"
            progress="0.75"
            increase="+14%"
            icon={
              <MonetizationOnIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={new Intl.NumberFormat('en-US').format(OrderInfo.total_orders)}
            subtitle="Transactions"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={new Intl.NumberFormat('en-US').format(ProductInfo.total_quantity)}
            subtitle="Quantity Product"
            progress="0.30"
            increase="+5%"
            icon={
              <ProductionQuantityLimitsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={ProductInfo.out_of_stock_count}
            subtitle="Out of stock"
            progress="0.80"
            increase="+43%"
            icon={
              <InventoryIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {numeral(OrderInfo.total_revenue).format('0.00a $')}
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <SummaryLineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {orderRecent.map((item, i) => (
            <RecentTransactions
              key={`${item.id}`}
              item = {item}
              // display="flex"
              // justifyContent="space-between"
              // alignItems="center"
              // borderBottom={`4px solid ${colors.primary[500]}`}
              // p="15px"
            />
            
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
