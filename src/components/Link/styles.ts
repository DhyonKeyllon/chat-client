import styled from "styled-components";

export const Link = styled.a<{ $width?: string; $height?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${({ $width }) => ($width ? $width : "max-content")};
  height: ${({ $height }) => ($height ? $height : "max-content")};
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }

  cursor: pointer;
`;
