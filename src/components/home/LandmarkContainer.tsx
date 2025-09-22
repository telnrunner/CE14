import { fetchLandmarks } from "../../../action/action";
import Hero from "../hero/Hero";
import LandmarkList from "./LandmarkList";
import { landmarkCardProps } from "@/utils/types";

const LandmarkContainer = async ({ search }: { search?: string }) => {
  //ดึงข้อมูลจาก landmark db พร้อมส่งไปใช้งาน ที่ list
  const landmarks: landmarkCardProps[] = await fetchLandmarks({ search }); //ส่ง search ไปต่อ
  //console.log(landmarks);
  return (
    <div>
      {/*<Hero landmarks={landmarks}/> */}
      <LandmarkList landmarks={landmarks} />
    </div>
  );
};
export default LandmarkContainer;
