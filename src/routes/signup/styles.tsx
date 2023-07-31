import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  gap: 16px;

  h1 {
    font-size: 52px;
    margin-bottom: 20px;
  }

  span:first-of-type {
    color: #c9546a;
  }

  span {
    display: flex;
  }
`;

const InputContainer = styled.div`
  display: flex;
  width: 184px;
`;

export { Container, InputContainer };
