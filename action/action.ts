"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { imageSchema, landmarkSchema, validateZod } from "@/utils/schemas";
import { profileSchema } from "@/utils/schemas";
import db from "@/utils/db";
import { redirect } from "next/navigation";
import { uploadFile } from "@/utils/supabase";
import { revalidatePath } from "next/cache";

//ไฟล์สำหรับ backend, Server

//getclerkuser
const getAuthUser = async () => {
  const user = await currentUser();
  //ถ้าไม่มี profile
  if (!user) {
    throw new Error("You must login!!");
  }
  if (!user.privateMetadata.hasProfile) {
    redirect("/profile/create");
  }
  return user;
};

//handleError
const handleError = (error: unknown): { message: string } => {
  //body
  return {
    message: error instanceof Error ? error.message : "An Error!",
  };
};

//func สำหรับส่งข้อมูล
export const CreateProfileAction = async (
  previousState: unknown,
  formData: FormData
) => {
  try {
    //เอา current user มาใช้งาน
    const user = await currentUser();
    //ถ้าไม่มีไป login
    if (!user) {
      throw new Error("please login!");
    }
    const rawData = Object.fromEntries(formData);
    const validateField = validateZod(profileSchema, rawData);
    console.log("validated", validateField);
    //insert to DB สร้าง profile
    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        //เอาข้อมูลใน validatefield ที่ส่งมาทำการ destructer ออกมา
        ...validateField,
      },
    });

    //  updateClerk
    const client = await clerkClient();
    await client.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
  } catch (error) {
    //console.log(error);
    return handleError(error);
  }
  redirect("/");
};

//Landmark
//func สำหรับส่งข้อมูล
export const CreateLandmarkAction = async (
  previousState: unknown,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    //เอา current user มาใช้งาน
    const user = await getAuthUser();
    //กำหนดว่าข้อมูลที่ส่งไปชุดนี้จะไปที่ server
    const rawData = Object.fromEntries(formData);

    // 1 validate Data Zod
    const file = formData.get("image") as File;
    const validateFile = validateZod(imageSchema, { image: file });
    const validateFields = validateZod(landmarkSchema, rawData);
    console.log("rawData:", rawData);
    console.log(validateFields);
    //console.log(validateFile);
    // 2 upload image to supabase
    const fullPath = await uploadFile(validateFile.image);
    console.log(fullPath);

    // 3 insert to db
    await db.landmark.create({
      data: {
        image: fullPath,
        profileId: user.id,
        ...validateFields,
      },
    });

    //return { message: "create landmark success!!" };
  } catch (error) {
    //console.log(error);
    return handleError(error);
  }
  redirect("/");
};

export const fetchLandmarks = async ({ search = "" }: { search?: string }) => {
  //code body ให้ไปเอาข้อมูล landmark จาก db มา แล้วเก็บไว้ใน landmarks
  const landmarks = await db.landmark.findMany({
    //เราค้นหาอะไรจาก search ค้นได้หมดจาก prisma tag
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { province: { contains: search } },
        { category: { contains: search, mode: "insensitive" } },
      ],
    },
    //เรียงจากล่าสุดขึ้นก่อน
    orderBy: {
      createdAt: "desc",
    },
  });
  return landmarks;
};
//--
export const fetchFavoriteId = async ({
  landmarkId,
}: {
  landmarkId: string;
}) => {
  // get ข้อมูลจาก database ออกมา
  const user = await getAuthUser();
  //หาข้อมูลใน db หา landmarkId จาก landmarkId แล้วก็ profileId จาก user.id
  const favorite = await db.favorite.findFirst({
    where: {
      landmarkId: landmarkId,
      profileId: user.id,
    },
    //เลือกส่งแค่ id ออกไป
    select: {
      id: true,
    },
  });
  // ส่งค่าออกไป
  return favorite?.id || null;
};

//--แสดงข้อความ
export const toggleFavoriteAction = async (prevState: {
  favoriteId: string | null;
  landmarkId: string;
  pathname: string;
}) => {
  //destruc ตัวแปร
  const { favoriteId, landmarkId, pathname } = prevState;
  const user = await getAuthUser();
  try {
    //เช็คว่าติด favorites หรือเปล่า
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
      //ถ้ายังไม่มี
    } else {
      await db.favorite.create({
        data: {
          landmarkId: landmarkId,
          profileId: user.id,
        },
      });
    }
    revalidatePath(pathname);
    //ถ้ามี favorite จะเป็น ลบ ถ้าไม่มีก็ สร้าง favorites
    return { message: favoriteId ? "Remove Favorite" : "Add Favorite" };
  } catch (error) {
    return handleError(error);
  }
};

export const fetchFavorites = async () => {
  const user = await getAuthUser();
  //ไปหาข้อมูล favorite จาก db ที่ userprofileId
  const favorites = await db.favorite.findMany({
    where: {
      profileId: user.id,
    },
    //เลือก landmark
    select: {
      landmark: {
        //เลือกอีกว่าจะเอาอะไรมาบ้าง ถ้าไม่ select มันจะเอามาทั้งหมด
        select: {
          id: true,
          name: true,
          description: true,
          province: true,
          category: true,
          price: true,
          lat: true,
          lng: true,
          image: true,
        },
      },
    },
  });
  //
  return favorites.map((favorite) => favorite.landmark);
};
