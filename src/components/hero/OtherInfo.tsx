import { landmarkCardProps } from "@/utils/types";

const OtherInfo = ({ landmark }: { landmark: landmarkCardProps }) => {
  return (
    <div className="text-white">
      <p>{landmark.province}</p>
      <p className="text-3xl mb-4 font-semibold md:my-3  md:text-4xl md:leading-[20px]">{landmark.name}</p>
      <p className="text-2xl">{landmark.description.substring(0,50)}</p>
    </div>
  );
};
export default OtherInfo;
