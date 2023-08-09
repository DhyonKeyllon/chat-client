import styled from "styled-components";

export const Container = styled.div<{ $me: boolean }>`
  display: flex;
  align-self: ${({ $me }) => ($me ? "flex-end" : "flex-start")};

  max-width: 216px;

  padding: 4px;
  border-radius: 2px;

  background-color: ${({ $me, theme }) =>
    $me ? theme.colors.backgroundSecondary : theme.colors.backgroundInfoSecondary};
`;
