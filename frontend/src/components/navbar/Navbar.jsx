import React, { useState, useEffect } from "react";
import { Button } from "../button/Button";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbarStyle">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            AItool
            <i className="fas fa-crop-alt"/>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times times" : "fas fa-bars bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
               Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dataset" className="nav-links" onClick={closeMobileMenu}>
               Dataset
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/page3" className="nav-links" onClick={closeMobileMenu}>
                page3
              </Link>
            </li>

            <li>
              <Link
                to="/sign-up"
                className="nav_links_mobile"
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle="button-outline">SIGN UP</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
