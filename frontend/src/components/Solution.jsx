import { Link } from "react-router-dom";

const Solution = () => {
  return (
    <div id="solutions">
      <div className="container">
        <div className="text">
          <p>
            Simplify your business payments with our intuitive tool. Manage,
            track, and optimize your financial transactions effortlessly. Take
            control of your finances and focus on growing your business.
          </p>
          <button>
            <Link to="/signup">Open account</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Solution;
