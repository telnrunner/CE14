//rafce
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/utils/category";

const CategoryInput = ({ defaultValue }: { defaultValue?: string }) => {
  //code
  const name = "category";
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
        defaultValue={defaultValue || categories[0].label}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        {/* map ค่าออกมาจาก categories เพื่อเอามาทำ select menu ตามโค้ดนั้นหล่าาพี่น้อง */}
        <SelectContent>
          {categories.map((item) => {
            return (
              <SelectItem key={item.label} value={item.label}>
                <span className="capitalize flex flex-row items-center gap-2">
                  <item.icon />
                  {item.label}
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
export default CategoryInput;
