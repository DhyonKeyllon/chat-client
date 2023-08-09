import styled from "styled-components";

const Button = styled.button<{ $height?: string; $width?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  height: ${(props) => props.$height || "100%"};
  width: ${(props) => props.$width || "100%"};

  color: ${(props) => props.theme.colors.secondary};
  background: ${(props) => props.theme.colors.backgroundSecondary};
  box-shadow: 0px 1px 1px rgba(7, 5, 2, 0.03);

  border-radius: 4px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -ms-border-radius: 4px;
  -o-border-radius: 4px;

  text-transform: uppercase;
  letter-spacing: 0.25em;

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:hover {
    background: ${(props) => props.theme.colors.hover};
    color: ${(props) => props.theme.colors.primary};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export { Button };
