import { ReactNode } from "react";

import { Container, Title } from "./styles";

type HeaderComponentProps = {
  title?: string;
  children?: ReactNode;
  icon?: ReactNode;
};

const HeaderComponent = ({ title, icon, children }: HeaderComponentProps) => {
  return (
    <Container>
      {icon}
      <Title>{title}</Title>
      {children}
    </Container>
  );
};

export default HeaderComponent;
