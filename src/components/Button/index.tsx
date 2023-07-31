import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { Button } from "./styles";

type ButtonProps = {
  children: ReactNode | ReactNode[];
  width?: string;
  height?: string;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const ButtonComponent = (props: ButtonProps) => {
  const { children, width, height } = props;

  return (
    <Button {...props} $width={width} $height={height}>
      {children}
    </Button>
  );
};

export default ButtonComponent;
