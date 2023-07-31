import { styled } from "styled-components";

const Input = styled.input<{ $width?: string; $height?: string }>`
  border: 2px solid ${(props) => props.theme.colors.gray200};
  border-radius: 4px;
  padding: 8px;

  height: ${(props) => (props.$height ? props.$height : "100%")};
  width: ${(props) => (props.$width ? props.$width : "100%")};

  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.background};

  &:focus-visible {
    outline-color: inherit;
  }

  ::placeholder {
    color: ${(props) => props.theme.colors.backgroundInfoPrimary};
  }

  :-ms-input-placeholder {
    color: ${(props) => props.theme.colors.backgroundInfoPrimary};
  }

  ::-ms-input-placeholder {
    color: ${(props) => props.theme.colors.backgroundInfoPrimary};
  }
`;

export { Input };
