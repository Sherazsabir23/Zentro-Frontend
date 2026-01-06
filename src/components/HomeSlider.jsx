import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const HomeSlider = () => {
  return (
     <section className="w-full md:py-10 bg-gray-100 flex justify-center">
      {/* Swiper container centered */}
      <div className="md:w-[90%] w-full mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          className="md:rounded-2xl overflow-hidden"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <img
              src="./firstimage.jpg"
              alt="Sale Banner"
              className="w-full h-auto object-cover  md:rounded-2xl"
            />
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <img
              src="./secondimage.jpg"
              alt="Latest Products"
              className="w-full h-auto object-contain md:rounded-2xl"
            />
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <img
              src="./thirdimage.jpg"
              alt="Most Loved"
              className="w-full h-auto object-contain md:rounded-2xl"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  )
}

export default HomeSlider