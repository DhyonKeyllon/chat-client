import { styled } from "styled-components";

const Container = styled.div<{ $isSelectedContact?: boolean }>`
  display: flex;
  flex-direction: row;

  height: 100%;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;

    height: 100%;
    width: 100%;

    ${(props) =>
      props.$isSelectedContact &&
      `
      height: 100%;
      width: 100%;
    `}
  }
`;

export { Container };
