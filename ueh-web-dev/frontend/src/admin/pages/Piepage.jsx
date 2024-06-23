import { Box } from "@mui/material";
import Header from "./Header";
import {OrderPieChart} from "../components/UI/PieChart";
const Pie = () => {
  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="75vh">
        <OrderPieChart />
      </Box>
    </Box>
  );
};

export default Pie;
