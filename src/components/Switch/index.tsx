import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { Label } from "./styles";

type SwitchComponentProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const SwitchComponent = (props: SwitchComponentProps) => {
  return (
    <Label>
      <input type="checkbox" {...props} />
      <span></span>
    </Label>
  );
};

export default SwitchComponent;
