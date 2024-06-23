import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import React, {useState, useEffect} from 'react'
import { tokens } from "../../theme";
import { mockBarHData as data } from "../../assets/data/mockData";
import useAxios from "../../../client/utils/useAxios";
// import useAxios from "../../../client/utils/useAxios";

const HorizontalBarChart = ( ) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [chartData, setChartData] = useState([]);
    const [productList, MakeproductList] = useState([]);
    const isProducts=useAxios()

    const mockTopProducts = [
      { product__carName: 'A B', total_revenue: 729810000 },
      { product__carName: 'CD', total_revenue: 701190000 },
      { product__carName: 'DS', total_revenue: 651430000 },
      { product__carName: 'GB', total_revenue: 286200000 },
      { product__carName: 'Fry', total_revenue: 128790000 },
      { product__carName: 'Toyota', total_revenue: 71550000 },
    ];

  //      if (Array.isArray(Object.values(api))) {
  //     // Nếu data không phải là mảng, xử lý lỗi hoặc chuyển đổi thành mảng
  //     console.error('Data is  an array:', data);
  //     console.log(typeof api.top_products)
  //     console.log(Object.values(api))
  //     console.log(mockTopProducts)
  //     // data = [];
  // }

  useEffect(() => {
    fetchToplist();

  }, []);



const fetchToplist = async () => {
    try {
        const response = await isProducts.get('categories/admin/products/top-selling');
        // setUserProfile(response.data);
        // checkStaff(response.data.is_staff)
        console.log( Object.values(response.data.top_products))
        console.log(typeof Object.values(response.data.top_products))
        MakeproductList(response.data.top_products)
        // console.log(Object.keys.keys(response.data))
        // Makestafflist(response.data)
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
};

    return(
  <ResponsiveBar
    data={productList}
    theme={{
        // added
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
    keys={['total_revenue']}
    indexBy='product__carName'
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    layout="horizontal"
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    colors={{ scheme: 'nivo' }}
    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Value',
      legendPosition: 'middle',
      legendOffset: 32
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Label',
      legendPosition: 'middle',
      legendOffset: -40
    }}
  />
);
}

export default HorizontalBarChart;
