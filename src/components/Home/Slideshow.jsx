import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
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
  const swiperRef = useRef(null);

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

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div className="home-section-module">
      <div className="home-section-module-important home-section-module-1 loaded">
        <Swiper
          ref={swiperRef}
          modules={[Autoplay]}
          slidesPerView={1.3}
          centeredSlides={true}
          spaceBetween={80}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { spaceBetween: 0, slidesPerView: 1 },
            1200: { spaceBetween: 80, slidesPerView: 1.3 },
          }}
          className="swiper-wrapper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="swiper-slide">
              <picture>
                <img
                  className="swiper-slide__background swiper-lazy swiper-lazy-loaded"
                  src={slide.image}
                  alt={`Banner ${slide.id + 1}`}
                  title={`Banner ${slide.id + 1}`}
                  loading="lazy"
                />
              </picture>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-navigation">
          <div className="swiper-button-prev" onClick={handlePrev}>
            <i className="fa fa-chevron-circle-left"></i>
          </div>
          <div className="swiper-button-next" onClick={handleNext}>
            <i className="fa fa-chevron-circle-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slideshow;