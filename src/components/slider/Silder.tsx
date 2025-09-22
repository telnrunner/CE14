"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";

export default function AutoSlider() {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
    >
      <SwiperSlide>
        <Image
          src="/images/pexels-eberhardgross-691668.jpg"
          alt="Slide 1"
          width={800}
          height={400}
          className="object-cover"
        />
      </SwiperSlide>
    </Swiper>
  );
}
