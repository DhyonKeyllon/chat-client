import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style-type: none;
    font-family: "Poppins", sans-serif;
  }

  button {
    font: 600 1rem "Poppins", sans-serif;
    border: none;
    cursor: pointer;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  span,
  h6 {
    font-weight: 700;
    color: ${(props) => props.theme.colors.text};
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.25rem;
  }

  h4 {
    font-size: 1rem;
  }

  span {
    font-size: 0.75rem;
  }
`;

export default GlobalStyle;
