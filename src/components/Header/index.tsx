import { ReactNode } from "react";

import { Container, Title } from "./styles";

type HeaderComponentProps = {
  title?: string;
  children?: ReactNode;
};

const HeaderComponent = ({ title, children }: HeaderComponentProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      {children}
    </Container>
  );
};

export default HeaderComponent;
