import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

function HeroSlider({ images, weather }) {
  return (
    <div className="relative h-162.5 rounded-3xl overflow-hidden mb-10">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        className="h-full"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <div className="relative h-full">
              <img
                src={image}
                alt="City"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute bottom-12 left-12 text-white">
                <h1 className="text-6xl font-bold">{weather.location.name}</h1>

                <p className="text-2xl mt-2">{weather.location.country}</p>

                <p className="text-3xl mt-4">{weather.current.temp_c}°C</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HeroSlider;
