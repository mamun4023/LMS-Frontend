import React from "react";
import GalleryImage1 from "../images/gallery/gallery1.png";
import GalleryImage2 from "../images/gallery/gallery2.png";
import GalleryImage3 from "../images/gallery/gallery3.png";
import GalleryImage4 from "../images/gallery/gallery4.png";
import GalleryImage5 from "../images/gallery/gallery5.png";
import GalleryImage6 from "../images/gallery/gallery6.png";
import GalleryImage7 from "../images/gallery/gallery7.png";
import GalleryImage8 from "../images/gallery/gallery8.png";

const Gallery = () => {
  return (
    <>
      <div className="jumbotron m-0">
        <div className="container">
          <h3 className="text-center">
            {" "}
            <b>Gallery </b>{" "}
          </h3>

          {/* gallary navbar  */}
          <ul class="nav nav-pills justify-content-center">
            <li class="nav-item p-2">
              <a class="nav-link  gallery-link" data-toggle="pill" href="#home">
                All
              </a>
            </li>
            <li class="nav-item p-2">
              <a class="nav-link  gallery-link" data-toggle="pill" href="#home">
                Plant
              </a>
            </li>

            <li class="nav-item p-2">
              <a class="nav-link  gallery-link" data-toggle="pill" href="#home">
                BPDP
              </a>
            </li>
            <li class="nav-item p-2">
              <a class="nav-link  gallery-link" data-toggle="pill" href="#home">
                330
              </a>
            </li>
          </ul>

          <div className="image-gallery-flex-container justify-content-center ">
            <div className="flex-item">
              <img src={GalleryImage1} />
            </div>
            <div className="flex-item">
              <img src={GalleryImage2} />
            </div>
            <div className="flex-item">
              <img src={GalleryImage3} />
            </div>
            <div className="flex-item">
              <img src={GalleryImage4} />
            </div>
            <div className="flex-item">
              <img src={GalleryImage5} />
            </div>
            <div className="flex-item">
              <img src={GalleryImage6} />
            </div>
            <div className="flex-item">
              <img src={GalleryImage7} />
            </div>
            <div className="flex-item">
              <img src={GalleryImage8} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Gallery;
