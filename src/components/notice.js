import React from "react";

const Notice = () => {
  return (
    <>
      <div className="jumbotron  m-0">
        <div className="row">
          <div className="col-md-7">
            <div className="container bg-white p-5">
              <h3> Notice Board </h3>
              <ul>
                <li> This is the notice title publish on today </li>
                <li> This is the notice title publish on today </li>
                <li> This is the notice title publish on today </li>
                <li> This is the notice title publish on today </li>
                <li> This is the notice title publish on today </li>
                <li> This is the notice title publish on today </li>
              </ul>
            </div>
          </div>
          <div className="col-md-5">
            <div className="container bg-white p-5">
              <h3> Latest News </h3>
              <ul>
                <li> This is the news title publish on today </li>
                <li> This is the news title publish on today </li>
                <li> This is the news title publish on today </li>
                <li> This is the news title publish on today </li>
                <li> This is the news title publish on today </li>
                <li> This is the news title publish on today </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row my-5">
          <div className="col-md">
            <div className="container bg-white blank"></div>
          </div>
          <div className="col-md">
            <div className="container bg-white blank"></div>
          </div>
          <div className="col-md">
            <div className="container bg-white blank"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notice;
