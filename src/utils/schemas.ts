import { z, ZodSchema } from "zod";


//const profileSchema = zod.string().min(2, { message: "ต้องระบุสองตัวอักษรขึ้นไป" });
//สร้าง Schema แบบ object
export const profileSchema = z.object({
  firstname: z.string().min(2, { message: "ชื่อ ต้องระบุสองตัวอักษรขึ้นไป" }),
  lastname: z.string().min(2, { message: "นามสกุล ต้องระบุสองตัวอักษรขึ้นไป" }),
  username: z
    .string()
    .min(2, { message: "ชื่อยูสเซอร์ ต้องระบุสองตัวอักษรขึ้นไป" }),
});

// ตรวจภาพกันหน่อยไวรุ่น
const validateImage = () => {
  const maxFileSize = 1024 * 1024;
  return (
    z
      .instanceof(File)
      //กำหนดเงื่อนใขของไฟล์ที่ส่งมา
      .refine((file) => {
        //ต้องน้อยกว่าเด้อไม่งั้นไม่ผ่าน
        return file.size <= maxFileSize;
      }, "File size must be less than 1mb")
  );
};

//
export const imageSchema = z.object({
  image: validateImage(),
});

export const landmarkSchema = z.object({
  name: z
    .string()
    .min(2, { message: "ต้องระบุมากกว่า 2 ตัวอักษร" })
    .max(20, { message: "ต้องระบุน้อยกว่า 20 ตัวอักษร" }),
  category: z.string(),
  description: z
    .string()
    .min(2, { message: "ต้องระบุรายละเอียดมากกว่า 2 ตัวอักษร" })
    .max(100, { message: "ต้องระบุรายละเอียดน้อยกว่า 100 ตัวอักษร" }),
  //coerce แปลค่าเป็นตัวเลข
  price: z.coerce.number().int().min(0, { message: "ราคาติดลบไม่ได้" }),
  province: z.string(),
  lat: z.coerce.number(),
  lng: z.coerce.number()
});

//func สำหรับ validate
//<T> = การทำ type แบบ Generic
export const validateZod = <T>(schema: ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data);
  //เช็ค condition ของ success
  if (!result.success) {
    const errors = result.error?.issues.map((error) => error.message);
    throw new Error(errors.join(","));
  }
  return result.data;
};
