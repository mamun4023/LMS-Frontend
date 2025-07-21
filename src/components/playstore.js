import React from "react";
import Image1 from "../images/apps.png";

const Playstore = () => {
  return (
    <>
      <div className="jumbotron m-0">
        <div className="container p-5 bg-white">
          <div className="row ">
            <div className="col-md">
              <h4> Download Our Mobile App </h4>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat
              </p>

              <ul className="nav ">
                <li className="nav-item playstore-link ">
                  <a className="nav-link " href="#">
                    Google Play
                  </a>
                </li>
                <li className="nav-item playstore-link ">
                  <a className="nav-link " href="#">
                    IOS Store
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md">
              <img className="img-fluid playstore-image " src={Image1} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Playstore;
