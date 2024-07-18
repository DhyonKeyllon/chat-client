import { styled } from "styled-components";

const Container = styled.div<{ $isSelectedContact?: boolean }>`
  flex-direction: column;

  height: 100%;
  width: 100%;
  max-width: 768px;

  ${(props) =>
    props.$isSelectedContact &&
    `
      height: 100%;
      width: 100%;
    `}
`;

export { Container };
