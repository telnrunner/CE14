//import
import { AlignLeft, UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { links } from "@/utils/links";
import SignOut from "./SignOut";
import { SignedIn, SignInButton, SignedOut, SignUpButton } from "@clerk/nextjs";
//endimport

//dropdownMenu /w shadeCn
//asChild เป็นการไส่เพื่อทำให้ Radix UI ไม่ทับกับ button ของเรา
// Radix UI เป็น UI สำเร็จรูปอาทิเช่น DropdownMenu, Dialog
//เป็นไฟล์สำเร็จรูปที่เราสามารถติดตั้งมาใช้งานได้โดยที่ไม่ต้องเขียน logic เอง
// แล้วก็สามารถต่อยอดได้ตามใจ ตัวอย่างในไฟล์ ui ที่เป็น radix ui จาก shadecn
const DropdownListMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} className="">
          <AlignLeft />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        {/* ล็อคเอ้าอยู่ */}
        <SignedOut>
          {/* ปุ่มล็อคอิน */}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignInButton mode="modal">
              <button> Login </button>
            </SignInButton>
          </DropdownMenuItem>
          {/* ปุ่มลงทะเบียน */}
          <DropdownMenuItem>
            <SignUpButton mode="modal">
              <button>Register</button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>
        {/* ล็อคเอ้าอยู่ */}
        {/* ล็อคอินแล้ว */}
        <SignedIn>
          {links.map((item, index) => {
            return (
              <DropdownMenuItem key={index}>
                <Link href={item.href}>{item.label} </Link>
              </DropdownMenuItem>
            );
          })}
          {/* ปุ่มล็อคเอ้า */}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOut />
          </DropdownMenuItem>
          {/* ปุ่มล็อคเอ้า */}
        </SignedIn>
        {/* ล็อคอินแล้ว */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownListMenu;
