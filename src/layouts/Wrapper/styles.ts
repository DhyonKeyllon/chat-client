import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  height: calc(100vh - 48px);
`;

export { Container, Content };
