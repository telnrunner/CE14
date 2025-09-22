//typescript
type NavLinks = {
  href: string;
  label: string;
};

//links สำหรับ map ข้อมูล object ออกมาแสดงผล
export const links: NavLinks[] = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "Profile"},
  { href: "/favorites", label: "Favorites" },
  { href: "/camp", label: "Camp" },
  { href: "/camp/create", label: "Create Landmark" },
  
];