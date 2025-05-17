import React from 'react';
import Slider from 'react-slick';
import home from '../assets/img/home/home.jpg';
import home1 from '../assets/img/home/home1.jpg';
import home2 from '../assets/img/home/home2.jpg';
import home3 from '../assets/img/home/home3.jpg';


const images = [home,home1,home2,home3];

const BackgroundCarousel = () => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 4000,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Slider {...settings}>
        {images.map((img, i) => (
          <div key={i}>
            <img
              src={img}
              alt={`slide-${i}`}
              style={{
                width: '100%',
                height: '100vh',
                objectFit: 'cover',
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BackgroundCarousel;
