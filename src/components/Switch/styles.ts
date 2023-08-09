import styled from "styled-components";

export const Label = styled.label`
  position: relative;
  display: inline-block;
  min-width: 40px;
  height: 24px;

  input:checked + span {
    background-color: #000;
  }

  input:checked + span:before {
    transform: translateX(100%);
    box-shadow: inset 8px -4px 0px 0px #f8f8f4;
  }

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    --background: linear-gradient(to right, #090613ef, #18151f);
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--background);
    transition: background-color 0.5s;
    border-radius: 30px;

    &:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      border-radius: 50%;
      left: 10%;
      bottom: 15%;
      box-shadow: inset 15px -4px 0px 15px #f8ea27;
      background: var(--background);
      transition: transform 0.5s, box-shadow 0.5s;
    }
  }
`;
