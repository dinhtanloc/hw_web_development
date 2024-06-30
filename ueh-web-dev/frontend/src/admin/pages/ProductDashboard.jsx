import useAxios from "../../client/utils/useAxios"
import { useState, useEffect }  from "react"
import { Box } from "@mui/material"
import { Button, IconButton, Typography, useTheme } from "@mui/material";
import StatBox from "../components/UI/StatBox";
import { tokens } from "../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import InventoryIcon from '@mui/icons-material/Inventory';
import HorizontalBarChart from "../components/UI/HorizontalBarChart ";
import Header from "./Header";
import LineChart from "../components/UI/LineChart";
import GeographyChart from "../components/UI/GeographyChart";
import BarChart from "../components/UI/BarChart";
// import StatBox from "../components/UI/StatBox";
import ProgressCircle from "../components/UI/ProgressCircle";
import {ProductPieChart} from "../components/UI/PieChart";
// import useAxios from "../utils/useAxios";

const ProductDashboard = () =>{
    const isProducts = useAxios()
    const theme = useTheme();
    const colors = tokens(theme.palette.mode); 
    const [productPercentage, MakeproductPercentage] = useState([]);
    const [ProductInfo, checkProductInfo] = useState([]);

    useEffect(() => {
        fetchProductlist();
        fetchStatlist();
        fetchProductInventory();

      }, []);


    const fetchProductlist = async () => {
        try {
            const response = await isProducts.get('categories/admin/products/');
            // setUserProfile(response.data);
            // checkStaff(response.data.is_staff)
            // Makestafflist(response.data)
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };
 
    const fetchStatlist = async () => {
        try {
            const response = await isProducts.get('categories/admin/products/inventory-quantity-stats');
            // setUserProfile(response.data);
            // checkStaff(response.data.is_staff)
            // Makestafflist(response.data)
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const fetchProductInventory = async () => {
      try {
          const response = await isProducts.get('categories/admin/products/check_inventory/');
          // setUserProfile(response.data);
          // checkStaff(response.data.is_staff)
          checkProductInfo(response.data)
          
      } catch (error) {
          console.error('Error fetching user profile:', error);
      }
  };

  const mockTopProducts = [
    { product__carName: 'Mercedes Benz XC90', total_revenue: 729810000 },
    { product__carName: 'Nissan Mercielago', total_revenue: 701190000 },
    { product__carName: 'BMW X3', total_revenue: 651430000 },
    { product__carName: 'Tesla Malibu', total_revenue: 286200000 },
    { product__carName: 'Ferrari Camry', total_revenue: 128790000 },
    { product__carName: 'Toyota Aventador', total_revenue: 71550000 },
  ];




    return(
      <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="PRODUCT DASHBOARD" subtitle="Inventory product situation" />

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
            title={new Intl.NumberFormat('en-US').format(ProductInfo.total_quantity)}
            subtitle="Ordered Products"
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
            title="431,225"
            subtitle="Sales Obtained"
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
            title="32,441"
            subtitle="New Clients"
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

        <Box
          gridColumn="span 6"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          // padding="3px"
        >
          <Typography
                variant="h5"
                fontWeight="600"
                sx={{ padding: "30px 30px 0 30px" }}
                >
                Percentage cancelled Orders
                </Typography>
                <Box height="550px" mt="-20px">
                    <ProductPieChart isDashboard={true} />
                </Box>

              

        </Box>

        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          // p="30px"
        >
          {/* <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            > */}
                {/* <Typography
                variant="h5"
                fontWeight="600"
                sx={{ padding: "30px 30px 0 30px" }}
                >
                Percentage cancelled Orders
                </Typography>
                <Box height="250px" mt="-20px">
                    <PieChart isDashboard={true} />
                </Box> */}

                <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "20px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px" marginLeft="50px">
          {/* <HorizontalBarChart data={mockTopProducts} keys={['total_revenue']} label="product__carName" /> */}
          <HorizontalBarChart/>

          </Box>
            {/* </Box> */}
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
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        {/* <Box
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
        </Box> */}
      </Box>
    </Box>
    );




}

export default ProductDashboard


