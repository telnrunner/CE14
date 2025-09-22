"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

// ข้อมูลสไลด์ที่จะแสดง - สามารถเปลี่ยนเป็นข้อมูลจาก API หรือ props ได้
const slides = [
  {
    image: "/image1.jpg",
    title: "ทดสอบ slider",
    description:
      "asdasdasddasdasdadasdaaaaaaaaaaaaaaaaaaaaaaasdasdasdasdasdadasd",
  },
  {
    image: "/image2.jpg",
    title: "ทดสอบ slider",
    description:
      "asdasdasddasdasdadasdaaaaaaaaaaaaaaaaaaaaaaasdasdasdasdasdadasd",
  },
  {
    image: "/image3.jpg",
    title: "ทดสอบ slider",
    description:
      "asdasdasddasdasdadasdaaaaaaaaaaaaaaaaaaaaaaasdasdasdasdasdadasd",
  },
];

export default function ImageSlider(): React.ReactNode {
  // State สำหรับเก็บตำแหน่งสไลด์ปัจจุบัน (เริ่มที่ 0 = สไลด์แรก)
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // State สำหรับตรวจสอบว่าเมาส์อยู่บนสไลด์หรือไม่ (ใช้หยุด auto-play)
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // State สำหรับควบคุมการเล่นอัตโนมัติ
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // State สำหรับแสดง loading animation ตอนโหลดครั้งแรก
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // ฟังก์ชันเลื่อนไปสไลด์ก่อนหน้า
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
    {
    }
    // ใช้ modulo (%) เพื่อให้วนกลับไปสไลด์สุดท้ายเมื่ออยู่ที่สไลด์แรก
  };

  // ฟังก์ชันเลื่อนไปสไลด์ถัดไป
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    // ใช้ modulo (%) เพื่อให้วนกลับไปสไลด์แรกเมื่ออยู่ที่สไลด์สุดท้าย
  };

  // ฟังก์ชันกระโดดไปยังสไลด์ที่ระบุ (ใช้กับปุ่ม indicator ด้านล่าง)
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Effect สำหรับการเล่นอัตโนมัติ
  useEffect(() => {
    // เล่นอัตโนมัติเมื่อ: ไม่ได้ hover และ isPlaying = true
    if (!isHovered && isPlaying) {
      // ตั้ง interval เลื่อนสไลด์ทุก 5 วินาที
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);

      // cleanup function - ลบ interval เมื่อ component unmount หรือ dependencies เปลี่ยน
      return () => clearInterval(interval);
    }
  }, [isHovered, isPlaying]);

  // Effect สำหรับจำลอง loading state (ในจริงอาจรอโหลดรูปภาพ)
  useEffect(() => {
    // แสดง loading 1 วินาทีแล้วเปลี่ยนเป็น false
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // แสดง Loading Skeleton ขณะโหลด
  if (isLoading) {
    return (
      <div className="relative w-full max-w-full mx-auto mt-6">
        <div className="relative h-[500px] w-full rounded-2xl overflow-hidden bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Spinner หมุน ใช้สี #beff46 (สีเขียวมะนาว) */}
            <div className="w-8 h-8 border-4 border-[#beff46] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  // Component หลัก
  return (
    <div className="relative w-full mx-auto mt-6 group">
      {/* Container หลักของ Slider */}
      <div
        className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl"
        onMouseEnter={() => setIsHovered(true)} // เมื่อเมาส์เข้า - หยุด auto-play
        onMouseLeave={() => setIsHovered(false)} // เมื่อเมาส์ออก - เริ่ม auto-play
      >
        {/* Gradient Overlay - สร้างเงาดำด้านล่างเพื่อให้ข้อความอ่านง่าย */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

        {/* Container สำหรับรูปภาพทั้งหมด - ใช้ translateX เลื่อนซ้าย-ขวา */}
        <div
          className="flex h-full transition-transform duration-800 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          // เลื่อน container ไปทางซ้ายตาม index * 100%
          // เช่น index = 1 จะเลื่อนไป -100% (แสดงรูปที่ 2)
        >
          {/* วนลูปแสดงรูปภาพทั้งหมด */}
          {slides.map((slide, index) => (
            <div key={index} className="relative w-full flex-shrink-0 h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill // ขยายเต็มพื้นที่ container
                style={{ objectFit: "cover" }} // ครอบภาพให้เต็มพื้นที่
                className="transition-transform duration-700 hover:scale-105"
                //priority={index === 0} // โหลดรูปแรกก่อน
              />
            </div>
          ))}
        </div>

        {/* ข้อความบนสไลด์ - แสดงด้านล่างซ้าย */}
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
          <div className="max-w-2xl">
            {/* หัวข้อ - มี animation fade in */}
            <h2 className="text-3xl md:text-4xl font-bold mb-3 transform transition-all duration-500 translate-y-0 opacity-100">
              {slides[currentIndex].title}
            </h2>
            {/* คำอธิบาย - มี animation delay 100ms */}
            <p className="text-lg md:text-xl opacity-90 leading-relaxed transform transition-all duration-500 delay-100">
              {slides[currentIndex].description}
            </p>
          </div>
        </div>

        {/* ปุ่มเลื่อนซ้าย */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center 
                     bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full 
                     transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-20"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        {/* ปุ่มเลื่อนขวา */}
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center 
                     bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full 
                     transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-20"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Progress Bar - แถบแสดงความคืบหน้าด้านบน */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/20 z-20">
          <div
            className="h-full bg-[#1a1917] transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / slides.length) * 100}%`,
            }}
            // คำนวณความกว้าง: (สไลด์ปัจจุบัน + 1) / จำนวนสไลด์ทั้งหมด * 100
          />
        </div>
      </div>

      {/* Indicators - จุดแสดงตำแหน่งสไลด์ด้านล่าง */}
      <div className="flex justify-center items-center mt-6 space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`transition-all duration-500 ease-out hover:scale-110 ${
              index === currentIndex
                ? "h-3 w-8 bg-[#beff46] rounded-full" // จุดที่ active - ยาวและสีเขียวมะนาว
                : "h-3 w-3 bg-gray-400 hover:bg-gray-500 rounded-full" // จุดปกติ - กลมและสีเทา
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
//เขียนโดนเทพ Calude Ai
