//type landmark
import { landmarkCardProps } from "@/utils/types";
import LandmarkCard from "../card/LandmarkCard";
import LoadingCard from "../card/LoadingCard";

//map ค่าออกมาจากที่ได้มาจาก container แล้วเอาไปให้ card
const LandmarkList = ({ landmarks }: { landmarks: landmarkCardProps[] }) => {
  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-6">
      {landmarks.map((landmark) => {
        return <LandmarkCard key={landmark.id} landmark={landmark} />;
      })}
    </section>
  );
};
export default LandmarkList;
