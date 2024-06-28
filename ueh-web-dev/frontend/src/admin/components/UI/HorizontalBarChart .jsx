import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import React, { useState, useEffect } from 'react';
import { tokens } from "../../theme";
import useAxios from "../../../client/utils/useAxios";
import * as d3 from 'd3';

const HorizontalBarChart = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [productList, setProductList] = useState([]);
    const isProducts = useAxios();

    useEffect(() => {
        fetchToplist();
    }, []);

    const fetchToplist = async () => {
        try {
            const response = await isProducts.get('categories/admin/products/top-selling');
            setProductList(response.data.top_products);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    // Tạo một hàm để tính toán màu sắc dựa trên giá trị của thanh
    const getColor = d => {
        const maxValue = Math.max(...productList.map(item => item.total_revenue));
        const colorScale = d3.scaleLinear()
            .domain([0, maxValue])
            .range(['#d3e5ff', '#08306b']); // màu xanh từ nhạt đến đậm
        return colorScale(d.total_revenue);
    };

    return (
        <ResponsiveBar
            data={productList}
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
            keys={['total_revenue']}
            indexBy='product__carName'
            margin={{ top: 30, right: 50, bottom: 50, left: 100 }}
            padding={0.3}
            layout="horizontal"
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={d => getColor(d.data)} // sử dụng hàm getColor để tính toán màu sắc
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 45,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 1,
                tickRotation: 0,
            }}
            labelSkipWidth={100}
            labelSkipHeight={100}
            labelTextColor="inherit:darker(1.6)"
            label={d => ''}
        />
    );
};

export default HorizontalBarChart;
