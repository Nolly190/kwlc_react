import React from "react";
import ReactModal, { Props as ReactModalProps } from "react-modal";
import styled from "styled-components";
import { ModalBlock, GlobalModalStyles } from "./styles";

interface Props extends ReactModalProps {
  onClose: () => void;
  title?: string;
  showClose?: boolean;

  shouldCloseOnOverlayClickOrEsc?: boolean;
  containerClass?: string;
  headerClass?: string;

  bodyClass?: string;
}

const Modal: React.FC<Props> = (props) => {
  const {
    isOpen,
    onClose,
    onAfterOpen,
    contentLabel,
    title,
    shouldCloseOnOverlayClickOrEsc = false,
    containerClass,
    ...rest
  } = props;

  return (
    <Container>
      <GlobalModalStyles />
      <ReactModal
        isOpen={isOpen}
        onAfterOpen={onAfterOpen}
        onRequestClose={onClose}
        contentLabel={contentLabel || "Modal"}
        closeTimeoutMS={200}
        shouldCloseOnOverlayClick={shouldCloseOnOverlayClickOrEsc}
        shouldCloseOnEsc={shouldCloseOnOverlayClickOrEsc}
        overlayClassName={`modal-overlay`}
        className="modal-content"
        {...rest}
      >
        <ModalBlock className={containerClass}>{props.children}</ModalBlock>
      </ReactModal>
    </Container>
  );
};

export default Modal;

const Container = styled.div`
  & > .modal-content {
    max-height: 90vh !important;
  }
`;
