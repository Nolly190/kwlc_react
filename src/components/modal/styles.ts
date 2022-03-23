import styled, { createGlobalStyle } from "styled-components";

export const GlobalModalStyles = createGlobalStyle`
  .modal-overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 15;

    opacity: 0;
    transition: opacity 200ms ease-in-out;

    &.ReactModal__Overlay--after-open {
      opacity: 1;
    }

    &.ReactModal__Overlay--before-close {
      opacity: 0;
    }
  }

  .modal-content {
    position: absolute;
    border: none;
    overflow: scroll;
    border-radius: 0px;
    outline: none;
    padding: 0px;

    max-height: 95vh;
    top: 50%;
    left: unset;
    right: 50%;
    bottom: unset;
    background: transparent;
    width: auto;
    max-width: 100%;
    transform: translate(50%, -50%);
  }
`;

export const ModalBlock = styled.div`
  position: relative;
  background-color: #ffffff;
  border-radius: 8px;

  width: 100%;
  height: 100%;
`;
