import Image from "next/image";
import { landmarkCardProps } from "@/utils/types";
import LandmarkRating from "./LandmarkRating";
import FavoritesButton from "./FavoritesButton";

const LandmarkCard = ({ landmark }: { landmark: landmarkCardProps }) => {
  const { name, image, price, id, province, lat, lng, category, description } =
    landmark;
  return (
    <article
      className="group relative mx-1 border-1 rounded-t-xl rounded-b-2xl
 border-gray-200"
    >
      <div className="mb-4 relative aspect-[4/3] rounded-t-xl overflow-hidden group">
        <Image
          src={image}
          alt={name}
          width={1000}
          height={1000}
          sizes="(max-width:768px) 100vw, 50vw"
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 "
        />
      </div>
      <div className="px-2 pb-3">
        {/* name */}
        <div className="flex items-center justify-between ">
          <h3 className="text-xl relative">{name}</h3>
          {/* rating */}
          <FavoritesButton landmarkId={id} />
        </div>
        {/* description */}
        <p className="text-sm text-muted-foreground">
          {description.substring(0, 40)}
        </p>
        {/* detail category, province */}
        <div className="mt-1 flex items-center justify-between">
          <p>{category}</p>
          <p className="text-sm ">{province}</p>
        </div>
      </div>
    </article>
  );
};
export default LandmarkCard; //ไฟล์นี้ส่งไปให้ landmarkcontainer
