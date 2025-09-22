import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { CreateProfileAction } from "../../../../action/action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

//rafce
//กำหนด form
const CreateProfile = async () => {
  //เช็คเงื่อนใขถ้ามี user แล้วหรือสร้างไปแล้วจะให้ protect หน้าของ profile create ไม่ให้เข้าได้
  const user = await currentUser();
  if (user?.privateMetadata.hasProfile) {
    redirect("/");
  }
  return (
    <>
      <h1 className="text-xl font-semibold capitalize">New users</h1>
      <div className="border p-6 rounded-xl max-w-lg">
        {/*form */}
        <FormContainer action={CreateProfileAction}>
          {/*ส่ง props ไปที่ FormInput*/}
          <div className="grid md:grid-cols-2 gap-3 mt-2">
            <FormInput
              placeholder="Firstname"
              type="text"
              name="firstname"
              label="Firstname"
            />
            <FormInput
              placeholder="Lastname"
              type="text"
              name="lastname"
              label="Lastname"
            />
            <FormInput
              placeholder="Username"
              type="text"
              name="username"
              label="Username"
            />
          </div>
          {/*ปุ่ม */}
          <SubmitButton text="Create Profile" classname="mt-2" size="lg" />
        </FormContainer>
      </div>
    </>
  );
};
export default CreateProfile;
