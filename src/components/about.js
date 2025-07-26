import React from "react";
import IndustryPic from "../images/about/industry.png";
import ChairmanPic from "../images/about/chairman.png";
import { ABOUT } from "../constants";

const About = () => {
  return (
    <>
      <div className="jumbotron m-0">
        <div className="container">
          <div className="row">
            <div className="col-md">
              <div className="m-4">
                <img className="img-fluid" src={IndustryPic} />
                <h4 className="text-center p-5">{ABOUT.SUBTITLE}</h4>
              </div>
            </div>

            <div className="col-md">
              <h3 className="text-center">
                {" "}
                <b>{ABOUT.TITLE}</b>
              </h3>
              <p className="text-justify">{ABOUT.DESCRIPTION}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md">
              <img className="img-fluid ChairmanPic " src={ChairmanPic} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
