import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { auth } from "@clerk/nextjs/server";
import { SigninCardButton } from "../form/Buttons";
import { fetchFavoriteId } from "../../../action/action";
import FavoriteToggleForm from "./FavoriteToggleForm";

const FavoritesButton = async ({ landmarkId }: { landmarkId: string }) => {
  //เช็คการ login ของ user ถ้าไม่มีให้ไป login ก่อน
  const { userId } = await auth();
  //console.log(userId);
  if (!userId || userId === null) return <SigninCardButton />;
  //แสดง user
  const favoriteId = await fetchFavoriteId({ landmarkId });
  //console.log(favoriteId);

  return (
    <FavoriteToggleForm favoriteId={favoriteId} landmarkId={landmarkId}/>
  );
};
export default FavoritesButton;
