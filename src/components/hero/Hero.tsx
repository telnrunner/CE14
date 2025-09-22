"use client";

import { landmarkCardProps } from "@/utils/types";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import OtherInfo from "./OtherInfo";
const Hero = ({ landmarks }: { landmarks: landmarkCardProps[] }) => {
  return (
    <div>
      {" "}
      <Swiper
        autoplay={{
          delay: 4000,
        }}
        pagination={{
          type: "progressbar",
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {landmarks.map((landmark) => {
          return (
            <>
              <SwiperSlide key={landmark.id}>
                <div className="mb-4 relative aspect-[16/9] rounded-t-xl overflow-hidden group">
                  <Image
                    src={landmark.image}
                    alt={landmark.name}
                    width={800}
                    height={800}
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 z-50">
                    <div className="mb-4 ml-4">
                      <OtherInfo landmark={landmark}/>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </>
          );
        })}
      </Swiper>
    </div>
  );
};
export default Hero;
