import useAxios from "../../client/utils/useAxios"
import { useState, useEffect }  from "react"
import LineChart from "../components/UI/LineChart";

import { Box } from "@mui/material"
import { Button, IconButton, Typography, useTheme } from "@mui/material";
import StatBox from "../components/UI/StatBox";
import { tokens } from "../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import EmailIcon from "@mui/icons-material/Email";
// import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import TrafficIcon from "@mui/icons-material/Traffic";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import InventoryIcon from '@mui/icons-material/Inventory';
import Header from "./Header";
import GeographyChart from "../components/UI/GeographyChart";
import {OrderPieChart} from "../components/UI/PieChart"
import {PaymentBarChart} from "../components/UI/BarChart";
import AreaChart from "../components/UI/AreaChart";
import numeral from "numeral";
// import StatBox from "../components/UI/StatBox";
import ProgressCircle from "../components/UI/ProgressCircle";
// import useAxios from "../utils/useAxios";


const OrderDashboard = () =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode); 
    const isOrders = useAxios() 
    const [orderInfo, checkOrderInfo] = useState([]);
    const [orderFigure, checkorderFigure] = useState([]);
    const [Productquantity, Cancelproduct] =useState([])
    
    useEffect(() => {
      fetchOrderInfo();
        fetchTotalOrder();
        fetchCancelQuantity();

      }, []);
      const fetchTotalOrder = async () => {
          try {
              const response = await isOrders.get('orders/admin/orders/total-order/');
              // setUserProfile(response.data);
              // checkStaff(response.data.is_staff)
              checkOrderInfo(response.data)
              
              
          } catch (error) {
              console.error('Error fetching user profile:', error);
          }
      };


    const fetchOrderInfo = async () => {
        try {
            const response = await isOrders.get('orders/admin/orders/order-status-total/');
            // setUserProfile(response.data);
            // checkStaff(response.data.is_staff)
            checkorderFigure(response.data)
            // Makestafflist(response.data)
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const fetchCancelQuantity = async () => {
      try {
          const response = await isOrders.get('categories/admin/products/cancelled-orders-product-quantity');
          // setUserProfile(response.data);
          // checkStaff(response.data.is_staff)
          Cancelproduct(response.data)
          // Makestafflist(response.data)
      } catch (error) {
          console.error('Error fetching user profile:', error);
      }
  };
    
   


    return(
      <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="ORDER DASHBOARD" subtitle="Sale analysis" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="129px"
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
            title={numeral(orderFigure.total_completed_revenue).format('0.00a $')}
            subtitle="Total completed sale"
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
            title={numeral(orderFigure.total_cancel_revenue).format('0.00a $')}
            subtitle="Loss"
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
            title={Productquantity.total_quantity}
            subtitle="Return products"
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
            title={new Intl.NumberFormat('en-US').format(orderInfo.total_orders)}
            subtitle="Transactions"
            progress="0.80"
            increase="+43%"
            icon={
              <InventoryIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
            gridColumn="span 6"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            >
                <Typography
                variant="h5"
                fontWeight="600"
                sx={{ padding: "30px 30px 0 30px" }}
                >
                Period sale and cancelled Orders
                </Typography>
                <Box height="250px" mt="-20px">
                <LineChart isDashboard={true} />
                </Box>
            </Box>
            <Box
            gridColumn="span 6"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            >
                <Typography
                variant="h5"
                fontWeight="600"
                sx={{ padding: "30px 30px 0 30px" }}
                >
                Sales period
                </Typography>
                <Box height="250px" mt="-20px">
                    <AreaChart  />
                </Box>
            </Box>


        
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Payment method Checking
          </Typography>
          <Box height="250px" mt="-20px">
            <PaymentBarChart isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          {/* <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            > */}
                <Typography
                variant="h5"
                fontWeight="600"
                sx={{ padding: "0px 0px 0 30px" }}
                >
                Percentage cancelled Orders
                </Typography>
                <Box height="250px" mt="-20px">
                    <OrderPieChart isDashboard={true} />
                </Box>
            {/* </Box> */}
        </Box>
       
      </Box>
    </Box>
    );




}

export default OrderDashboard