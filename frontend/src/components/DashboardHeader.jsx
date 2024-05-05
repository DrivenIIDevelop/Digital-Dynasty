import { Link } from "react-router-dom";
import LogoRegular from "./icons/LogoRegular";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import PropTypes from "prop-types";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupIcon from "@mui/icons-material/Group";
import FaceIcon from "@mui/icons-material/Face";

const links = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: DashboardIcon,
  },
  {
    name: "Transfer",
    path: "/transfer",
    icon: SwapHorizIcon,
  },
  {
    name: "Partnership",
    path: "/partnership",
    icon: GroupIcon,
  },
  {
    name: "Expenses",
    path: "/expenses",
    icon: AttachMoneyIcon,
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
        <FaceIcon />
        Profile
      </Link>
    </div>
  );
};

DashboardHeader.propTypes = {
  currentPage: PropTypes.string.isRequired,
};

export default DashboardHeader;
