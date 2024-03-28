import React from "react";
import { Link } from "react-scroll";
import './Header.css'
// import Toggle from "../Toggle/Toggle";
// import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="n-wrapper container" id="Navbar">
      {/* left */}
      <div className="n-left">
        <div className="n-name">Coding Thinker</div>
        {/* <Toggle /> */}
      </div>
      {/* right */}
      <div className="n-right">
        <div className="n-list">
          <ul style={{ listStyleType: "none" }}>
            <li>
              <Link    activeClass="active"  spy={true} smooth={true}>
                Home
              </Link>
            </li>
            <li>
              <Link to="services" spy={true} smooth={true}>
                Services
              </Link>
             
            </li>
            <li>
              <Link to="works" spy={true} smooth={true}>
                Interested
              </Link>
            </li>
            <li>
              <Link to="portfolio" spy={true} smooth={true}>
                Portfolio
              </Link>
            </li>
            <li>
              <Link to="testimonial" spy={true} smooth={true}>
                Education
              </Link>
            </li>
          </ul>
        </div>
        <Link to="contact" spy={true} smooth={true}>
        <Link   to="/signup" className="button n-button">Signup/Login</Link>
        </Link>
      </div>
    </div>
  );
};

export default Header;
