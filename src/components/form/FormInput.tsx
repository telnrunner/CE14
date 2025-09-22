import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormInputProps = {
  name: string;
  type: string;
  //ไส่ ? เพื่อทำให้เป็นค่าว่างได้อย่างเช่นข้อมูลที่ไส่หรือไม่ก็ได้
  label?: string;
  defaultValue?: string;
  placeholder?: string;
};

//รับ props พร้อม destrucring ข้อมูลในตัวแปร name ออกมา
const FormInput = (props: FormInputProps) => {
  //destrucring
  const { name, type, label, defaultValue, placeholder } = props;

  return (
    <div className="mb-2 mt-2">
      <Label htmlFor="firstname">{label}</Label>
      <Input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </div>
  );
};
export default FormInput;
