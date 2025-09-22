"use client";

import React, { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { actionFunction } from "../../utils/types";

//ค่าเริ่มต้นของ FormActionState
const initialState = {
  message: "",
};
// กำหนด type ของ function ต้องมีการรับและส่งออก อยู๋ใน utils
//type actionFunction = (
// previousState:any,
// formData:FormData
//)=>Promise<{message:string}>

//rafce
//React.ReactNodeReactNode => เราจะกำหนด type กับสิ่งที่ retrun ออกมาได้ เช่นพวก tag form,div
//นิยมใช้กับ props.children เพราะ children อาจเป็นอะไรก็ได้ใน JSX
//ใช้ระบุ return type ของ function/component ที่อาจ return JSX หลาย ๆ ตัว หรือประเภทอื่น ๆ ที่ React รองรับ
const FormContainer = ({
  action,
  children,
}: {
  action: actionFunction;
  children: React.ReactNode;
}) => {
  //useActionState
  //formAction ใช้รับข้อมูลจาก formData
  //State ใช้รับข้อมูลจากการ retrun จากในฟังชั้นของ formData
  const [state, formAction] = useActionState(action, initialState);
  //console.log("State = ", state);
  //console.log("message", state.message);

  //Toast
  useEffect(() => {
    if (state.message) {
      // เรียกใช่้แบบ object
      toast(state.message, {
        action: {
          label: "Undo",
          onClick: () => console.log("Undo clicked"),
        },
      });
    }
    //toast error notification
    else {
      toast.error("error");
    }
  }, [state]);

  return <form action={formAction}> {children} </form>;
};
export default FormContainer;
