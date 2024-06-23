import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
// import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../theme";
import { mockAreaData as data } from "../../assets/data/mockData";
import useAxios from "../../../client/utils/useAxios";
import React, {useEffect, useState} from "react";
const AreaChart = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isProducts=useAxios()
    const [ProductData, checkProductdata] = useState([])


    useEffect(() => {
      fetchToplist();
  
    }, []);
  
  
  
  const fetchToplist = async () => {
      try {
          const response = await isProducts.get('orders/admin/time-series/');
          // setUserProfile(response.data);
          // checkStaff(response.data.is_staff)
         
          checkProductdata(response.data)
          // console.log(Object.keys.keys(response.data))
          // Makestafflist(response.data)
      } catch (error) {
          console.error('Error fetching user profile:', error);
      }
  };
    return(
  <ResponsiveLine
    data={ProductData}
    theme={{
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
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Time',
      legendOffset: 36,
      legendPosition: 'middle'
    }}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Value',
      legendOffset: -40,
      legendPosition: 'middle'
    }}
    enableGridX={false}
    enableGridY={true}
    enableArea={true}
    areaOpacity={0.1}
    colors={{ scheme: 'nivo' }}
  />
);

}

export default AreaChart;
