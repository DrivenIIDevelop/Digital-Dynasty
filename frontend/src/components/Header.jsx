import LogoRegular from "./icons/LogoRegular";
import { Link } from "react-router-dom";
import { Squeeze as Hamburger } from "hamburger-react";
import { useEffect, useState } from "react";
import LogoSmall from "./icons/LogoSmall";
import { motion } from "framer-motion";

const Header = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  const [open, setOpen] = useState(false);

  // Handle window resize to toggle hamburger
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header>
      {isDesktop ? <LogoRegular /> : <LogoSmall />}

      <nav className="nav">
        {isDesktop ? null : (
          <Hamburger
            color="#447ae3"
            className="burger-icon"
            onToggle={() => setOpen(!open)}
            toggled={open}
            toggle={setOpen}
          />
        )}
        {/* Display links based on state */}
        {open || isDesktop ? (
          <motion.ul
            className="links"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#solutions">Solutions</a>
            </li>
            <li>
              <a href="#pricing">Pricing</a>
            </li>
            <li>
              <a href="#help">Help center</a>
            </li>
          </motion.ul>
        ) : null}
      </nav>
      <div className="authentication">
        <Link className="login" to="/login">
          Log in
        </Link>
        <Link className="signup" to="/signup">
          Sign up
        </Link>
      </div>
    </header>
  );
};

export default Header;
