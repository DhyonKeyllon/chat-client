import { ReactNode } from "react";

import { Container } from "./styles";

type HeaderComponentProps = {
  title?: string;
  children?: ReactNode;
};

const HeaderComponent = ({ title, children }: HeaderComponentProps) => {
  return (
    <Container>
      <h2>{title}</h2>
      {children}
    </Container>
  );
};

export default HeaderComponent;
