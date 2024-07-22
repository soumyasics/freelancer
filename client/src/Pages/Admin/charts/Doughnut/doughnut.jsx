import 'chart.js/auto';
import { Doughnut } from "react-chartjs-2";
export const DoughnutChart = ({ chartData }) => {
  return <Doughnut data={chartData} />;
};

