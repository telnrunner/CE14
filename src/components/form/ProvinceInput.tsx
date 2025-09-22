//rafce
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { provinces } from "@/utils/province";

const ProvinceInput = ({ defaultValue }: { defaultValue?: string }) => {
  //code
  const name = "province";
  //return
  return (
    <div className="mb-2 mt-2 pl-1 ">
      <Label htmlFor={name} className="capitalize">
        {name}
      </Label>
      {/* ต้องมีค่า default ถ้าไม่มีก็เอาค่า เริ่มต้นตาม categories ของเรา */}
      <Select
        name={name}
        required
        defaultValue={defaultValue || provinces[0].PROVINCE_NAME}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        {/* map ค่าออกมาจาก categories เพื่อเอามาทำ select menu ตามโค้ดนั้นหล่าาพี่น้อง */}
        <SelectContent>
          {provinces.map((item) => {
            return (
              <SelectItem key={item.PROVINCE_ID} value={item.PROVINCE_NAME}>
                <span className="capitalize flex flex-row items-center gap-2">
                  {item.PROVINCE_NAME}
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
export default ProvinceInput;
