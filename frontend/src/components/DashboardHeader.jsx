import { Link } from "react-router-dom";
import LogoRegular from "./icons/LogoRegular";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PieChartOutlineIcon from "@mui/icons-material/PieChartOutline";
import ArticleIcon from "@mui/icons-material/Article";
import PropTypes from "prop-types";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const links = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: DashboardIcon,
  },
  {
    name: "Clients",
    path: "/clients",
    icon: BusinessCenterIcon,
  },
  {
    name: "Vendors",
    path: "/vendors",
    icon: SwapHorizIcon,
  },
  {
    name: "Payment",
    path: "/payment",
    icon: ReceiptIcon,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: PieChartOutlineIcon,
  },
  {
    name: "Invoices",
    path: "/invoices",
    icon: ArticleIcon,
  },
];

const DashboardHeader = (props) => {
  return (
    <div id="dashboard-header">
      <LogoRegular />
      <nav>
        <ul className="links">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                className={`link ${
                  props.currentPage === link.name ? "active" : ""
                }`}
                to={link.path}
              >
                <link.icon />
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Link
        className={`link ${props.currentPage === "Profile" ? "active" : ""}`}
        to="/profile"
      >
        <AccountBoxIcon />
        Profile
      </Link>
    </div>
  );
};

DashboardHeader.propTypes = {
  currentPage: PropTypes.string.isRequired,
};

export default DashboardHeader;
