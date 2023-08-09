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

const ProfileText = styled.span`
  margin-right: 8px;
  font-size: 16px;
  font-weight: 500;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;

  width: calc(100% - 122px);
`;

export { Container, Content, ProfileText, ProfileContainer };
