import { ResponsivePie } from "@nivo/pie";
import React, {useState, useEffect} from 'react'
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
// import { mockPieData as data } from "../../assets/data/mockData";
import useAxios from "../../../client/utils/useAxios";

export const ProductPieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [ProductData, checkProductdata] = useState([])
  const isProducts =useAxios();


  useEffect(() => {
    fetchToplist();
  }, []);
  
  const fetchToplist = async () => {
    try {
        const response = await isProducts.get('categories/admin/pieData');
        // setUserProfile(response.data);
        // checkStaff(response.data.is_staff)
        checkProductdata(response.data)
        // Makestafflist(response.data)
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
};

  return (
    <ResponsivePie
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
      margin={{ top: 100, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      color={{ scheme: 'category10' }}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'Vinfast'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'Nissan'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'Audi'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'Mercedes'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'Ferrari'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'Tesla'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'Toyota'
                },
                id: 'lines'
            }
        ]}
      legends={[
        {
          anchor: "bottom",
          direction: "column",
          justify: false,
          translateX: 300,
          translateY: -300,
          itemsSpacing: 5,
          itemWidth: 70,
          itemHeight: 20,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};


export const OrderPieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [ProductData, checkProductdata] = useState([])
  const isProducts =useAxios();


  useEffect(() => {
    fetchToplist();
  }, []);
  
  const fetchToplist = async () => {
    try {
        const response = await isProducts.get('orders/admin/pieData/');
        // setUserProfile(response.data);
        // checkStaff(response.data.is_staff)
        checkProductdata(response.data)
        // Makestafflist(response.data)
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
};

  return (
    <ResponsivePie
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
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(0, 0, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
            {
                match: {
                    id: 'completed'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'cancelled'
                },
                id: 'line'
            },
            {
                match: {
                    id: 'pending'
                },
                id: 'dots'
            },
          
           
        ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};