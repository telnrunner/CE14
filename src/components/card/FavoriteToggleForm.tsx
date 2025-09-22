"use client";
import { usePathname } from "next/navigation";
import { toggleFavoriteAction } from "../../../action/action";
import FormContainer from "../form/FormContainer";
import { CardSubmitButton } from "../form/Buttons";


//กำหนด type
const FavoriteToggleForm = ({
  favoriteId,
  landmarkId,
}: {
  favoriteId: string | null;
  landmarkId: string;
}) => {
  //console.log("id", favoriteId);
  //pathname
  const pathname = usePathname();
  //console.log(pathname);
  //bind
  const toggleAction = toggleFavoriteAction.bind(null, {
    favoriteId,
    landmarkId,
    pathname,
  });
  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={favoriteId ? true : false}/>
    </FormContainer>
  );
};
export default FavoriteToggleForm;
