import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import React, {useState, useEffect} from 'react'
import { tokens } from "../../theme";
import { mockBarHData as data } from "../../assets/data/mockData";
import useAxios from "../../../client/utils/useAxios";

const HorizontalBarChart = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [ProductData, checkProductdata] = useState([])
    const api = useAxios()


    useEffect(() => {
      fetchproduct();
    }, []);
    
    const fetchproduct = async () => {
        try {
            const response = await api.get('orders/admin/barH-data/')
            // setUserProfile(response.data);
            // checkStaff(response.data.is_staff)
            checkProductdata(response)
            console.log(ProductData)
            
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };
    return(
  <ResponsiveBar
    data={data}
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
    keys={['value']}
    indexBy="label"
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
