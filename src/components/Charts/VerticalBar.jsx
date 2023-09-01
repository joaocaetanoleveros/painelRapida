import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box } from "@chakra-ui/react";

const generateRandomColor = () => {
  // Generate a random color in hexadecimal format
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

const VerticalBarChart = ({ data }) => {
  const chartData = {
    categories: data.map((item) => item.label),
    values: data.map((item) => item.value),
    colors: data.map((item) => item.color || generateRandomColor()),
  };

  

  const options = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
    },
    title: {
      text: "<strong>VENDAS TOTAIS POR CANAIS</strong>",
    },
    credits: {
      enabled: false, // Disable Highcharts credits
    },
    xAxis: {
      categories: chartData.categories,
      labels: {
        style: {
          color: "#000000",
          fontSize: "1rem",
        },
      },
    },
    yAxis: {
      min: 0,
      tickInterval: 10000,
      title: {
        text: "Valor total de vendas (R$)",
      },
      labels: {
        style: {
          fontSize: "1rem",
        },
      },
    },
    legend: {
      enabled: false,
    }, // Remove the legend

    label: {
      enabled: true,
      style: {
        fontSize: "1.0rem",
      },
    },
    tooltip: {
      style: {
        fontSize: "1.1em",
      },
    },

    series: [
      {
        name: "R$",
        type: "column",

        data: chartData.values.map((value, index) => ({
          y: value,
          color: chartData.colors[index],
        })),
      },
    ],
  };

  return (
    <Box w="100%" h="100%">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { height: "100%", width: "100%" } }}
      />
    </Box>
  );
};

export default VerticalBarChart;
