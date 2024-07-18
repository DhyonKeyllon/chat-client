import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 48px;
  padding: 20px;

  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  border-bottom: 2px solid ${(props) => props.theme.colors.primary};

  & svg {
    cursor: pointer;
    font-size: 24px;
    color: ${(props) => props.theme.colors.primary};
  }
`;

const Title = styled.h2`
  white-space: nowrap;
`;

export { Container, Title };
