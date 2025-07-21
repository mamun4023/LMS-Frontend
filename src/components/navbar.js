import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo/logo1.png";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar  ">
        <a className="brand">
          <img className="img-fluid logo" src={Logo} />
        </a>
        <ul
          class="nav nav-pills justify-content-end pill-color "
          id="pills-tab"
          role="tablist"
        >
          <li class="nav-item">
            <Link class="nav-link active" data-toggle="pill" to="/">
              Home
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link " data-toggle="pill" to="/department">
              Department
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" data-toggle="pill" to="/learning">
              Learning
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" data-toggle="pill" to="/notice">
              Notice
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" data-toggle="pill" to="/about">
              About
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" data-toggle="pill" to="/contact">
              Contact
            </Link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#menu2">
              <i class="fas fa-user-circle login-icon"></i>
            </a>
          </li>
        </ul>
      </nav>

      <div class="tab-content">
        <div class="tab-pane container active" id="home"></div>
        <div class="tab-pane container fade" id="menu1"></div>
        <div class="tab-pane container fade" id="menu2"></div>
      </div>
    </>
  );
}

export default Navbar;
