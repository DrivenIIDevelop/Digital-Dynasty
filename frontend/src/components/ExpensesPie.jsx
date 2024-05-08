import { Pie } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS, Legend, plugins } from "chart.js/auto";
import PropTypes from "prop-types";

const options = {
  responsive: true,
  // maintainAspectRatio: false,
  cutout: 80,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const ExpensesPie = (props) => {
  const { data } = props;
  return <Pie data={data} options={options} />;
};

export default ExpensesPie;

ExpensesPie.propTypes = {
  data: PropTypes.object.isRequired,
};
