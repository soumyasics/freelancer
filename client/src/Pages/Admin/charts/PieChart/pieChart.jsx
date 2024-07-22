
import 'chart.js/auto';
import { Pie } from "react-chartjs-2";
export const PieChart = ({ chartData }) => {
  return <Pie data={chartData} />;
};