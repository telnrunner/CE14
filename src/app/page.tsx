import LoadingCard from "@/components/card/LoadingCard";
import LandmarkContainer from "@/components/home/LandmarkContainer";
import ImageSlider from "@/components/slider/ImageSlider";
import React from "react";
import { Suspense } from "react";
const HomePage = async ({
  searchParams,
}: {
  searchParams: { search?: string };
}) => {
  //Search รับข้อมูลจาก search params เข้ามาใช้เพื่อ map ค่า
  const { search } = await searchParams;
  console.log(search);
  return (
    <div>
      <Suspense fallback={<LoadingCard />}>
        <LandmarkContainer search={search} />
      </Suspense>
    </div>
  );
};
export default HomePage;
