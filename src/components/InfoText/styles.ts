import styled from "styled-components";

import { ETextType } from "./enums";

export const Container = styled.span<{ $type: ETextType }>`
  display: flex;
  align-items: center;
  justify-items: center;

  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.backgroundInfoSecondary};
  color: ${({ theme, $type }) => {
    switch ($type) {
      case ETextType.SUCCESS:
        return theme.colors.success;
      case ETextType.ERROR:
        return theme.colors.error;
      case ETextType.WARNING:
        return theme.colors.warning;

      default:
        return theme.colors.text;
    }
  }};

  width: max-content;
  height: max-content;

  padding: 4px 8px;

  font-size: 12px;
`;
