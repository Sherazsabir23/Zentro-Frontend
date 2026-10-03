import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

const HomeSlider = () => {
  const [sliders, setSliders] = useState([]);
  const navigate = useNavigate();

 useEffect(() => {
  const fetchSliders = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sliders`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();

      // IMPORTANT: Only set sliders if the data is an array
      if (Array.isArray(data)) {
        setSliders(data);
      } else {
        console.error("API did not return an array:", data);
        setSliders([]); // Fallback to empty array
      }
    } catch (error) {
      console.log("Slider error", error);
      setSliders([]); // Fallback on network error
    }
  };
  fetchSliders();
}, []);

  return (
    <section className="w-full md:py-10 bg-gray-100 flex justify-center">
      {/* Swiper container centered */}
      <div className="md:w-[90%] w-full mx-auto">
        <Swiper
        key={sliders.length}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          className="md:rounded-2xl overflow-hidden"
        >
          {sliders.map((slide) => (
            <SwiperSlide key={slide._id}>
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}${slide.image}`}
                alt="Banner"
                onClick={() => navigate(slide.link)}
                className="w-full h-auto object-cover md:rounded-2xl cursor-pointer"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HomeSlider;
