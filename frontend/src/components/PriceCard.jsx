import Checked from "./icons/Checked";
import Removed from "./icons/Removed";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const PriceCard = ({
  isPopular,
  title,
  description,
  priceStructure,
  billingTerm,
  isLastFeature,
}) => {
  return (
    <div className={`card ${isPopular ? "popular" : ""}`}>
      {isPopular && <span className="most-popular">Popular</span>}
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      <div className="price">
        <span className="pricing-structure">{priceStructure}</span>
        <span className="slash">/</span>
        <span className="billing-term">{billingTerm}</span>
      </div>
      <ul className="features">
        <li>
          <Checked />
          <p>Process Unlimited Payments</p>
        </li>
        <li>
          <Checked />
          <p>Activate Three Business Services</p>
        </li>
        <li>
          {isLastFeature ? <Checked /> : <Removed />}
          <p>Analyze and Predict Financial Trends</p>
        </li>
      </ul>
      <button>
        <Link to="/signup">Get started</Link>
      </button>
    </div>
  );
};

PriceCard.propTypes = {
  isPopular: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  priceStructure: PropTypes.string.isRequired,
  billingTerm: PropTypes.string.isRequired,
  isLastFeature: PropTypes.bool.isRequired,
};

export default PriceCard;
