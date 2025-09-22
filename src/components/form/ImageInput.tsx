import { Input } from "../ui/input";
import { Label } from "../ui/label";

const ImageInput = () => {
  const name = "image";
  return (
    <div>
      <Label className="capitalize">{name}</Label>
      <Input id={name} name={name} type="file" accept="image/*" required/>
    </div>
  );
};
export default ImageInput;
