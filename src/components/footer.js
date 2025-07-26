import React from "react";
import Logo from "../images/logo/logo.png";
import Helpline from "../images/helpline.png";
import { COMMON } from "../constants";

const Footer = () => {
  return (
    <>
      <div className="jumbotron m-0 ">
        <div className="footer">
          <div className="row">
            <div className="col-md px-3">
              <img className="px-5" src={Logo} />
              <p className="text-justify">{COMMON.DESCRIPTION}</p>
              <span className="icon">
                <i class="fas fa-map-marker-alt"></i> &nbsp; {COMMON.ADDRESS}{" "}
              </span>
              <br />
              <span className="icon">
                <i class="fas fa-phone-alt"></i> &nbsp; {COMMON.PHONE}{" "}
              </span>
              <br />
              <span className="icon">
                <i class="fas fa-envelope"> </i> &nbsp; {COMMON.EMAIL}{" "}
              </span>
            </div>

            <div className="col-md">
              <h3>Device</h3>
              <hr className="bar" />
              <ul>
                <li>Device name one </li>
                <li>Device name two </li>
                <li>Device name Three </li>
                <li>Device name four </li>
                <li>Device name five </li>
                <li>Device name six </li>
                <li>Device name seven </li>
              </ul>
            </div>
            <div className="col-md">
              <h3>Usefull Link</h3>
              <hr className="bar" />
              <ul>
                <li>Device name one </li>
                <li>Device name two </li>
                <li>Device name Three </li>
                <li>Device name four </li>
                <li>Device name five </li>
                <li>Device name six </li>
                <li>Device name seven </li>
              </ul>
            </div>
            <div className="col-md">
              <h3>Hotline</h3>
              <hr className="bar" />
              <img className="img-fluid helpline" src={Helpline} />
            </div>
          </div>

          <div className="row p-3">
            <div className="col-md">
              <h6 className="text-center py-2">
                {COMMON.LAST_UPDATED}{" "}
              </h6>
            </div>
            <div className="col-md text-center">
              <ul className="nav">
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" href="#">
                    {" "}
                    Contract & Feedback{" "}
                  </a>{" "}
                </li>
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" href="#">
                    {" "}
                    Download{" "}
                  </a>{" "}
                </li>
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" href="#">
                    {" "}
                    Mobile App{" "}
                  </a>{" "}
                </li>
              </ul>
            </div>
          </div>
          <hr />

          <div className="row">
            <div className="col">
              <h6 className="text-center">
                {COMMON.COPYRIGHT}{" "}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
