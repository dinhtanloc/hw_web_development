import { useTheme } from "@mui/material";
import { ResponsiveChoropleth } from '@nivo/geo'
import { geoFeatures } from "../../assets/data/mockGeoFeatures";
import { tokens } from "../../theme";
import { mockGeographyData as data } from "../../assets/data/mockData";
import { scaleQuantize } from 'd3-scale'; // Import thư viện D3


const GeographyChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const colorScale = scaleQuantize()
  //   .domain([0, 1000000]) // Định nghĩa miền giá trị
  //   .range(['#ffffff', '#ff0000', '#00ff00', '#0000ff']);
  return (
    <ResponsiveChoropleth
      data={data}
      colors={'RdBu'}
      value={'value'}
      projectionType="mercator"
      layers={['graticule', 'features', 'legends']}
      onClick={(feature) => console.log("Clicked", feature)}
      fillColor={(feature) => colors.grey[100]}
      onMouseEnter={(feature, event) => console.log("Mouse entered", feature, event)}
      onMouseLeave={() => console.log("Mouse left")}
      onMouseMove={(feature, event) => console.log("Mouse moved", feature, event)}
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
      }}
      
      features={geoFeatures.features}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      domain={[0, 1000000]}
      unknownColor="#666666"
      label="properties.name"
      valueFormat=".2s"
      projectionScale={isDashboard ? 40 : 150}
      projectionTranslation={isDashboard ? [0.49, 0.6] : [0.5, 0.5]}
      projectionRotation={[0, 0, 0]}
      borderWidth={1.5}
      borderColor="#ffffff"
      match={undefined}
      role="string"
      enableGraticule={false}
      graticuleLineColor="#dddddd"
      graticuleLineWidth={0.5}
      isInteractive={true}
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-left",
                direction: "column",
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: colors.grey[100],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#ffffff",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

export default GeographyChart;
