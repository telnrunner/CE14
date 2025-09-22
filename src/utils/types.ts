// กำหนด type ของ function ต้องมีการรับและส่งออก
export type actionFunction = (
  previousState: unknown,
  formData: FormData
) => Promise<{ message: string }>;

//type ของ landmarkcard
export type landmarkCardProps = {
  price: number;
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  province: string;
  lat: number;
  lng: number;
};
