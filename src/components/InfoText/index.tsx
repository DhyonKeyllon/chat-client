import { PropsWithChildren } from "react";
import { Container } from "./styles";
import { ETextType } from "./enums";

type AlertComponentProps = {
  type: ETextType;
} & PropsWithChildren;

const AlertComponent = ({ children, type }: AlertComponentProps) => {
  return <Container $type={type}>{children}</Container>;
};

export default AlertComponent;
