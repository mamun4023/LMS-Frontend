import React from "react";
import IndustryPic from "../images/about/industry.png";
import ChairmanPic from "../images/about/chairman.png";

const About = () => {
  return (
    <>
      <div className="jumbotron m-0">
        <div className="container">
          <div className="row">
            <div className="col-md">
              <div className="m-4">
                <img className="img-fluid" src={IndustryPic} />
                <h4 className="text-center p-5">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut
                </h4>
              </div>
            </div>

            <div className="col-md">
              <h3 className="text-center">
                {" "}
                <b>About Shahjibazar Power Co. Ltd </b>
              </h3>
              <p className="text-justify">
                {" "}
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor inviduntut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duodolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sitamet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                inviduntut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit
              </p>
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
