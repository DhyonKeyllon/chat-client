import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";
import { Input } from "./styles";

type InputComponentProps = {
  width?: string;
  height?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const InputComponent = forwardRef<HTMLInputElement, InputComponentProps>((props, ref) => {
  const { width, height } = props;

  return <Input $width={width} $height={height} ref={ref} {...props} />;
});

export default InputComponent;
