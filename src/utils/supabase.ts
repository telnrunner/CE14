import { createClient } from "@supabase/supabase-js";

const bucket_name = "landmark-bucket";
const url = process.env.SUPABASE_URL as string;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

// Create Supabase client
const supabase = createClient(url, key);

// Upload file using standard upload
export async function uploadFile(image: File) {
  //กำหนดชื่อไฟล์ที่รับมา
  const timeStamp = Date.now();
  const newName = `Image${timeStamp}-${image.name}`;

  const { data, error } = await supabase.storage
    .from(bucket_name)
    .upload(newName, image,{
      cacheControl:'3600 '
    });
  if (!data) {
    // Handle error
    throw new Error("Image upload failed!!");
  } else {
    // Handle success
    return supabase.storage.from(bucket_name).getPublicUrl(newName).data
      .publicUrl;
  }
}
