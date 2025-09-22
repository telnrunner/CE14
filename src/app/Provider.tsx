import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/sonner";
//กำหนด type React.ReactNode สำหรับข้อมูลที่ Return ออกมาเป็น JSX ได้ เช่น Component ต่างๆ
//theme ใช้สำหรับเก็บ component theme ที่ส่งออกมาจาก theme-provider
const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </>
  );
};
export default Provider;
