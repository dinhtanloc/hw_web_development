import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
// import useAxios from "../../../client/utils/useAxios";
// import React, {useState, useEffect} from 'react'


const ProgressCircle = ({ progress = "0.75", size = "40" }) => {
  const theme = useTheme();
  // const api = useAxios()
  // const [OrderData, checkOrderdata] = useState([])
  const colors = tokens(theme.palette.mode);
  const angle = progress * 360;
  // useEffect(() => {
  //   fetchOrder();
  // }, []);
  
  // const fetchOrder = async () => {
  //     try {
  //         const response = await api.get('orders/admin/orders/order-status-total')
  //         // setUserProfile(response.data);
  //         // checkStaff(response.data.is_staff)
  //         checkOrderdata(response)
  //         console.log(OrderData)
          
  //     } catch (error) {
  //         console.error('Error fetching user profile:', error);
  //     }
  // };

  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent[500]} ${angle}deg 360deg),
            ${colors.greenAccent[500]}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;
