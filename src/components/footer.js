import React from "react";
import Logo from "../images/logo/logo.png";
import Helpline from "../images/helpline.png";

const Footer = () => {
  return (
    <>
      <div className="jumbotron m-0 ">
        <div className="footer">
          <div className="row">
            <div className="col-md px-3">
              <img className="px-5" src={Logo} />
              <p className="text-justify">
                Lorem ipsum dolor sit amet,consetetur sadipscing elitr, sed diam
                nonumy eirmod tempor invidunt utlabore et dolore magna aliquyam
                erat,sed diam voluptua. At vero eos et
              </p>
              <span className="icon">
                <i class="fas fa-map-marker-alt"></i> &nbsp; N2, Shahjibazar{" "}
              </span>
              <br />
              <span className="icon">
                <i class="fas fa-phone-alt"></i> &nbsp; 01709-641889{" "}
              </span>
              <br />
              <span className="icon">
                <i class="fas fa-envelope"> </i> &nbsp; name@email.com{" "}
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
                {" "}
                Site was last updated 22 JUL 2021 05:30:44{" "}
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
                Copyright @ 2021 Website Develop & Maintains by TEXON Ltd{" "}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
