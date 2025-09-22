import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },

  images: {
    // Remote URL ที่อนุญาต
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wmbfzwzzmezmnwmpetvh.supabase.co",
      },
    ],

    // สำหรับไฟล์ใน public ไม่ต้องระบุ hostname ก็ใช้ได้
    // แต่สามารถเปิด unoptimized สำหรับ development หรือ local ได้
    unoptimized: false, // ตั้งเป็น true หากไม่ต้องการ optimization
  },
};

export default nextConfig;
