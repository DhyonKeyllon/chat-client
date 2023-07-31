import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 72px;
  padding: 16px;

  border-top: 2px solid ${(props) => props.theme.colors.gray200};
  background-color: ${(props) => props.theme.colors.backgroundInfoSecondary};

  gap: 8px;

  button {
    border-radius: 100%;
    width: 40px;
    height: 40px;

    svg:hover {
      color: (var--background-secondary);
      fill: (var--background-secondary);
    }
  }
`;

export { Container };
