import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Slideshow.css';

import ImgBanner1 from "/src/assets/img/banner1.jpg";
import ImgBanner2 from "/src/assets/img/banner2.png";
import ImgBanner3 from "/src/assets/img/banner3.jpg";
import ImgBanner4 from "/src/assets/img/banner4.jpg";
import ImgBanner5 from "/src/assets/img/banner5.jpg";
import ImgBanner6 from "/src/assets/img/banner6.png";
import ImgBanner7 from "/src/assets/img/banner7.jpg";
import ImgBanner8 from "/src/assets/img/banner8.png";
import ImgBanner9 from "/src/assets/img/banner9.png";
import ImgBanner10 from "/src/assets/img/banner10.jpg";
import ImgBanner11 from "/src/assets/img/banner11.png";

const Slideshow = () => {
  const slides = [
    { id: 0, image: ImgBanner1 },
    { id: 1, image: ImgBanner2 },
    { id: 2, image: ImgBanner3 },
    { id: 3, image: ImgBanner4 },
    { id: 4, image: ImgBanner5 },
    { id: 5, image: ImgBanner6 },
    { id: 6, image: ImgBanner7 },
    { id: 7, image: ImgBanner8 },
    { id: 8, image: ImgBanner9 },
    { id: 9, image: ImgBanner10 },
    { id: 10, image: ImgBanner11 }
  ];

  return (
    <div className="home_slider">
      {/* Swiper Container */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        className="banners-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <img
              src={slide.image}
              alt={`Banner ${slide.id + 1}`}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'cover',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination Dots (below slider) */}
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default Slideshow;