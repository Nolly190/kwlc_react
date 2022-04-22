import React, { useContext } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { createReportApi } from "../../../../api/report.api";
import { statusEnum } from "../../../../enums/util.enum";
import { ChurchReportContext } from "./churchReportContext";
import StyledInput from "./components/styledInput";
import {
  Button,
  ButtonWrapper,
  EntryContainer,
  Form,
  InputWrapper,
  Row,
  Title,
} from "./financialReport";

interface MeetingDetailsProps {
  closeModal: () => void;
  goToPrevPage: () => void;
}

const MeetingDetails: React.FC<MeetingDetailsProps> = ({
  closeModal,
  goToPrevPage,
}) => {
  const { churchReport, setChurchReport } = useContext(ChurchReportContext);

  const handleSermonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setChurchReport({
      ...churchReport,
      sermon: {
        ...churchReport.sermon,
        [name]: value,
      },
    });
  };

  const handleAttendanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setChurchReport({
      ...churchReport,
      attendance: {
        ...churchReport.attendance,
        [name]: value,
      },
    });
  };

  console.log(churchReport);

  const handleSubmit = async () => {
    const response = await createReportApi(churchReport);
    if (response.code >= statusEnum.ok) {
      toast.success("Report uploaded successfully");
      closeModal();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <Container>
      <Title>Meeting Report</Title>
      <Row>
        <EntryContainer width={47}>
          <p>Message</p>
          <InputWrapper>
            <StyledInput
              name="message"
              width={100}
              onChange={handleSermonChange}
              defaultValue={churchReport?.sermon?.message || ""}
            />
          </InputWrapper>
        </EntryContainer>
        <EntryContainer width={47}>
          <p>Text</p>
          <InputWrapper>
            <StyledInput
              name="text"
              width={100}
              onChange={handleSermonChange}
              defaultValue={churchReport?.sermon?.text || ""}
            />
          </InputWrapper>
        </EntryContainer>
      </Row>
      <Row>
        <EntryContainer width={47}>
          <p>Preacher</p>
          <InputWrapper>
            <StyledInput
              name="preacher"
              width={100}
              onChange={handleSermonChange}
              defaultValue={churchReport?.sermon?.preacher || ""}
            />
          </InputWrapper>
        </EntryContainer>
        <EntryContainer width={47}>
          <p>Programme</p>
          <InputWrapper>
            <StyledInput
              name="programme"
              width={100}
              onChange={handleSermonChange}
              defaultValue={churchReport?.sermon?.programme || ""}
            />
          </InputWrapper>
        </EntryContainer>
      </Row>
      <Row>
        <EntryContainer width={47}>
          <p>Venue</p>
          <InputWrapper>
            <StyledInput
              name="venue"
              width={100}
              onChange={handleSermonChange}
              defaultValue={churchReport?.sermon?.venue || ""}
            />
          </InputWrapper>
        </EntryContainer>
        <EntryContainer width={47}>
          <p>Date</p>
          <InputWrapper>
            <StyledInput
              name="date"
              type="date"
              width={100}
              onChange={handleSermonChange}
              defaultValue={churchReport?.sermon?.date || ""}
            />
          </InputWrapper>
        </EntryContainer>
      </Row>
      {/* <Row>
        <EntryContainer width={47}>
          <p>Service Id</p>
          <InputWrapper>
            <StyledInput
              name="serviceId"
              width={100}
              onChange={handleSermonChange}
              defaultValue={churchReport?.serviceId || ""}
            />
          </InputWrapper>
        </EntryContainer>
      </Row> */}
      <Row className="mt-20">
        <EntryContainer width={100}>
          <p>Attendance</p>
          <div>
            <InputWrapper width={100}>
              <StyledInput
                name="male"
                width={15}
                onChange={handleAttendanceChange}
                defaultValue={churchReport?.attendance?.male || ""}
                type="number"
                placeholder="Male"
              />
              <StyledInput
                name="female"
                width={15}
                onChange={handleAttendanceChange}
                defaultValue={churchReport?.attendance?.female || ""}
                type="number"
                placeholder="Female"
              />
              <StyledInput
                name="children"
                width={15}
                onChange={handleAttendanceChange}
                defaultValue={churchReport?.attendance?.children || ""}
                type="number"
                placeholder="Children"
              />
              <StyledInput
                name="visitors"
                width={15}
                onChange={handleAttendanceChange}
                defaultValue={churchReport?.attendance?.visitors || ""}
                type="number"
                placeholder="Visitors"
              />
              <StyledInput
                name="converts"
                width={15}
                onChange={handleAttendanceChange}
                defaultValue={churchReport?.attendance?.converts || ""}
                type="number"
                placeholder="Converts"
              />
              <StyledInput
                name="onlineWorshiper"
                width={15}
                onChange={handleAttendanceChange}
                defaultValue={churchReport?.attendance?.onlineWorshiper || ""}
                type="number"
                placeholder="Online"
              />
            </InputWrapper>
          </div>
        </EntryContainer>
      </Row>
      <ButtonWrapper className="mt-40">
        <Button onClick={goToPrevPage}>
          <img src="/images/next-icon.png" className="backBtn" alt="" />
          <p>Back</p>
        </Button>
        <Button onClick={handleSubmit}>
          <p>Submit</p>
          <img src="/images/next-icon.png" alt="" />
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

export default MeetingDetails;

const Container = styled.div``;
