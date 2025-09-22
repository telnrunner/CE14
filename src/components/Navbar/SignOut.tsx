//rafce
"use client";
import { handleLogout } from "./Toast";
import { SignOutButton } from "@clerk/nextjs";
const SignOut = () => {
  return (
    <SignOutButton redirectUrl="/">
      {/* แจ้งการ logout */}
      <button className="" onClick={handleLogout}>
        Logout
      </button>
    </SignOutButton>
  );
};
export default SignOut;
