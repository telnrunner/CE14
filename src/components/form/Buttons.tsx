"use client";
import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { SignInButton } from "@clerk/nextjs";
import { BookmarkCheck, Bookmark } from "lucide-react";
//ยูเนียนไทป์ คือ ของที่ส่งมาจาก props จะต้องเป็น 1 ในนี้ที่กำหนดเท่านั้น
type btnSize = "default" | "lg" | "sm";

//type ปกติ
type SubmitButtonProps = {
  classname?: string;
  size?: btnSize;
  text: string;
};

export const SubmitButton = ({ classname, size, text }: SubmitButtonProps) => {
  //pedding ลง React Dom ด้วย แต่ V. ใหม่ไปใช้ UseActionStatus แทน
  const { pending } = useFormStatus();
  return (
    <>
      <Button
        disabled={pending}
        type="submit"
        className={`${classname} capitalize`}
        size={size}
      >
        {/* ternaly เขียน if else */}
        {pending ? (
          <>
            <LoaderCircle className="animate-spin" />
            <span>Please wait..</span>
          </>
        ) : (
          <p>{text}</p>
        )}
      </Button>
    </>
  );
};

export const SigninCardButton = () => {
  return (
    <SignInButton>
      <button></button>
    </SignInButton>
  );
};

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  //console.log('is',isFavorite);
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="">
      {pending ? (
        <LoaderCircle className="animate-spin"/>
      ) : isFavorite ? (
        <BookmarkCheck />
      ) : (
        <Bookmark />
      )}
    </button>
  );
};
