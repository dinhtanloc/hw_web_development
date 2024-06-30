import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import useAxios from "../../../client/utils/useAxios";
import React, { useEffect, useState } from "react";
import { formatDefaultLocale } from 'd3-format'; // Import thư viện d3-format
import { ResponsiveBump } from '@nivo/bump'


const LineChart = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isProducts = useAxios();
    const [productData, setProductData] = useState([]);

    // Thiết lập định dạng cho số người dùng hiện tại
    useEffect(() => {
        fetchTimeSeries();
    }, []);

    const fetchTimeSeries = async () => {
        try {
            const response = await isProducts.get('orders/admin/time-series/');
            setProductData(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching time series data:', error);
        }
    };

    // Thiết lập định dạng số người dùng
    const enUs = formatDefaultLocale({
        thousands: ",",
        grouping: [3],
        currency: ["$", ""]
    });

    return (
      <ResponsiveBump
      data={productData}
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
      colors={{ scheme: 'spectral' }}
        lineWidth={3}
        activeLineWidth={6}
        inactiveLineWidth={3}
        inactiveOpacity={0.15}
        pointSize={10}
        activePointSize={16}
        inactivePointSize={0}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={3}
        activePointBorderWidth={3}
        pointBorderColor={{ from: 'serie.color' }}
        axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -36,
            truncateTickAt: 0
        }}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 100,
            tickRotation: 0,
            legend: 'ranking',
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0
        }}
        margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
        axisRight={null}
        enableGridY={false}
        
        />
    );
};

export default LineChart;
