import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
const TextAreaInput = ({
  name,
  LabelText,
  placeholder,
  defaultValue,
}: {
  name?: string;
  LabelText?: string;
  placeholder: string;
  defaultValue?: string;
}) => {
  return (
    <div className="mb-2 w-full ">
      <Label htmlFor={name}>{LabelText || name}</Label>
      <Textarea
        id={name}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        rows={5}
        required
      />
    </div>
  );
};
export default TextAreaInput;
