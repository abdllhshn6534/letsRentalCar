import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import slides from "./slides.json";
import "./slider.scss";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper";

const Slider = () => {
  const pagination = {
    clickable: true,
  };

  return (
    <Swiper
      effect={"fade"}
      pagination={pagination}
      navigation={true}
      modules={[Navigation, Pagination, EffectFade, Autoplay]}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      className="slider"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="content">
            <h2>{slide.title}</h2>
            <p>{slide.desc}</p>
          </div>
          <img
            src={require(`../../../../assets/img/slider/${slide.image}`)}
            alt={slide.title}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
