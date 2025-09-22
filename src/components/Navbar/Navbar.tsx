import React from "react";
import Logo from "./Logo";
import Search from "./Search";
import { DarkMode } from "./Darkmode";
import DropdownListMenu from "./DropdownListMenu";

// แก้ navbar container ใหแยกกับ web components
const Navbar = () => {
  return (
    <div
      className="container flex flex-col sm:flex-row 
    justify-between py-8 sm:items-center gap-4"
    >
      {/*Logo */}
      <Logo />

      {/*Search */}

      <Search />

      {/* DarkMode & Proflie */}
      <div className="flex gap-2">
        <DarkMode />
      </div>

      {/*DropdownListMenu */}
      <DropdownListMenu />
    </div>
  );
};

export default Navbar; //ส่งไป layout
