// Import Swiper React components
import React from "react";

// include images
import slideImage1 from "../images/event/1.jpg";
import slideImage2 from "../images/event/2.jpg";
import slideImage3 from "../images/event/3.jpg";
import slideImage4 from "../images/event/4.jpg";
import slideImage5 from "../images/event/5.jpg";
import slideImage6 from "../images/event/6.jpeg";
import slideImage7 from "../images/event/7.jpeg";
import slideImage8 from "../images/event/8.jpg";
import slideImage9 from "../images/event/9.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";
import "swiper/css/pagination";

const Events = () => {
  return (
    <div className="jumbotron m-0 py-0">
      <h3 className="text-center">
        <b>All Events</b>
      </h3>
      <div className="swiper-container">
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={3}
          navigation={true}
          className="mySwiper"
        >
          <SwiperSlide className="swiper-zoom-container">
            <img className="slide-image" src={slideImage1} alt="Event 1" />
          </SwiperSlide>
          <SwiperSlide className="swiper-zoom-container">
            <img className="slide-image" src={slideImage2} alt="Event 2" />
          </SwiperSlide>
          <SwiperSlide className="swiper-zoom-container">
            <img className="slide-image" src={slideImage3} alt="Event 3" />
          </SwiperSlide>
          <SwiperSlide className="swiper-zoom-container">
            <img className="slide-image" src={slideImage4} alt="Event 4" />
          </SwiperSlide>
          <SwiperSlide className="swiper-zoom-container">
            <img className="slide-image" src={slideImage5} alt="Event 5" />
          </SwiperSlide>
          <SwiperSlide className="swiper-zoom-container">
            <img className="slide-image" src={slideImage6} alt="Event 6" />
          </SwiperSlide>
          <SwiperSlide className="swiper-zoom-container">
            <img className="slide-image" src={slideImage7} alt="Event 7" />
          </SwiperSlide>
          <SwiperSlide className="swiper-zoom-container">
            <img className="slide-image" src={slideImage8} alt="Event 8" />
          </SwiperSlide>
          <SwiperSlide className="swiper-zoom-container">
            <img className="slide-image" src={slideImage9} alt="Event 9" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Events;
