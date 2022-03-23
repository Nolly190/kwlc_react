import React, { useState, useEffect, useContext } from "react";
import {
  ModalContainer,
  ModalHeaderContainer,
  NewUserHeader,
  NewUserBody,
  NewUserAside,
  Divider,
  ChurchReportFormWrapper,
  StepperRow,
  StepperConnector,
} from "./styles";
import Modal from "../../../../components/modal";
import {
  ChurchReportContext,
  ChurchReportProvider,
} from "./churchReportContext";
import FinancialReport from "./financialReport";
import MeetingDetails from "./meetingDetails";
interface NewUserProps {
  isOpen: boolean;
  closeModal: () => void;
  handleComplete?: () => void;
}

const ChurchReportModal: React.FC<NewUserProps> = ({
  isOpen,
  closeModal,
  handleComplete,
}) => {
  const { setChurchReport } = useContext(ChurchReportContext);
  const [activeIndex, setActiveIndex] = useState(1);

  const handleGoToNextPage = () => {
    setActiveIndex((activeIndex) => activeIndex + 1);
  };

  const handleGoToPrevPage = () => {
    setActiveIndex((activeIndex) => activeIndex - 1);
  };

  useEffect(() => {
    return () => {
      setActiveIndex(1);
      setChurchReport({});
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    closeModal();
    setChurchReport({});
  };

  return (
    <ChurchReportProvider>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalContainer>
          <ModalHeaderContainer>
            <NewUserHeader>
              <p>Upload Church Report</p>
              <span></span>
            </NewUserHeader>
            <span onClick={() => handleClose()}>x</span>
          </ModalHeaderContainer>
          <NewUserBody>
            <NewUserAside>
              <StepperRow
                current={activeIndex === 1}
                completed={activeIndex > 1}
              >
                <span></span>
                <p>Financial Report</p>
                <StepperConnector />
              </StepperRow>
              <StepperRow
                current={activeIndex === 2}
                completed={activeIndex > 2}
              >
                <span></span>
                <p>Meeting Details</p>
              </StepperRow>
            </NewUserAside>
            <Divider />
            <ChurchReportFormWrapper>
              {activeIndex === 1 && (
                <FinancialReport goToNextPage={handleGoToNextPage} />
              )}
              {activeIndex === 2 && (
                <MeetingDetails
                  closeModal={handleComplete}
                  goToPrevPage={handleGoToPrevPage}
                />
              )}
            </ChurchReportFormWrapper>
          </NewUserBody>
        </ModalContainer>
      </Modal>
    </ChurchReportProvider>
  );
};

export default ChurchReportModal;
