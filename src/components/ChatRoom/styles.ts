import styled from "styled-components";

const Container = styled.div`
  justify-self: center;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  max-width: 100%;
  height: 100%;
`;

const ChatContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 14px;
  gap: 16px;

  overflow-y: auto;

  height: 100%;
  width: 100%;
`;

export { Container, ChatContent };
