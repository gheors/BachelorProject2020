import React, {useState, useEffect} from "react";
import {Link, NavLink} from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const [click, setClick] = useState(false);
    const [, setButton] = useState(true);

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
            <div className="navbar-container">

                <div className="menu-icon" onClick={handleClick}>
                    <i className={click ? "fas fa-times times" : "fas fa-bars bars"}/>
                </div>
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        AiTiA
                        <i className="fas fa-crop-alt"/>
                    </Link>
                    <li className="nav-item"
                    >
                        <NavLink exact to="/" className="nav-links" activeClassName="navbar__link--active"
                                 onClick={closeMobileMenu}>
                            welcome
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/dataset" className="nav-links" activeClassName="navbar__link--active"
                                 onClick={closeMobileMenu}>
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/page3" className="nav-links" activeClassName="navbar__link--active"
                                 onClick={closeMobileMenu}>
                            Statistics
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Navbar;
