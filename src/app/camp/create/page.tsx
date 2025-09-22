import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { CreateLandmarkAction } from "../../../../action/action";
import CategoryInput from "@/components/form/CategoryInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import ProvinceInput from "@/components/form/ProvinceInput";
import MapLandmark from "@/components/map/MapLandmark";
import ImageInput from "@/components/form/ImageInput";

//rafce
//กำหนด form
const CreateProfile = async () => {
  return (
    <>
      <h1 className="text-xl font-semibold capitalize">Create Landmark</h1>
      <div className="border p-6 rounded-xl max-w-lg">
        {/*form */}
        <FormContainer action={CreateLandmarkAction}>
          {/*ส่ง props ไปที่ FormInput*/}
          <div className="grid md:grid-cols-2 gap-3 mt-4">
            <FormInput
              placeholder="Landmark"
              type="text"
              name="name"
              label="Landmark"
            />
            {/*Category */}
            <CategoryInput />
            {/*ปุ่ม */}
          </div>
          <TextAreaInput
            defaultValue=""
            name="description"
            placeholder="Type your description"
          />
          <div className="grid md:grid-cols-2 gap-3 mt-4">
            <FormInput
              placeholder="Price"
              type="number"
              name="price"
              label="Price"
            />
            <ProvinceInput />
          </div>
          <ImageInput />
          <MapLandmark />

          <SubmitButton text="Create Landmark" classname="mt-2" size="lg" />
        </FormContainer>
      </div>
    </>
  );
};
export default CreateProfile;
