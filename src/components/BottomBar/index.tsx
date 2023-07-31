import { Container } from "./styles";

type BottomBarComponentProps = {
  children?: React.ReactNode;
};

function BottomBarComponent({ children }: BottomBarComponentProps) {
  return <Container>{children}</Container>;
}

export default BottomBarComponent;
