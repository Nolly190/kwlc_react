import styled, { css } from "styled-components";
import mediaQueries from "../../../../mediaQueries";

interface props {
  width?: string;
}

export const ModalContainer = styled.div<props>`
  font-family: "Open Sans", sans-serif;
  padding: 40px 0 40px 40px;
  width: ${(props) => (props.width ? props.width : "75vw")};
  max-height: 90vh;

  @media (max-width: 465px) {
    width: 95vw;
    padding: 15px;
  }
`;

export const SlidersModalContainer = styled(ModalContainer)`
  padding: 40px;

  @media (max-width: 465px) {
    padding: 15px;
  }
`;

export const ModalHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;

  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 2px;
    width: 25px;
    height: 25px;
    color: #fff;
    margin-right: 40px;
    font-size: 17px;
    border-radius: 50%;
    background-color: #000;
    cursor: pointer;

    ${mediaQueries.mobile} {
     margin-right: 0px;
    }
  }
`;

export const SlidersModalHeaderContainer = styled(ModalHeaderContainer)`
  & > span {
    margin-right: 0;
  }
`;

export const NewUserHeader = styled.div`
  margin-bottom: 30px;

  & > p {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 0px;
    color: #0d0f12;
  }

  & > span {
    display: inline-block;
    width: 93px;
    border: 1px solid #d90b2c;
  }
`;

export const NewUserBody = styled.div`
  display: flex;
`;

export const NewUserAside = styled.div`
  width: 20%;

  ${mediaQueries.mobile} {
    display: none;
  }
`;

export const Divider = styled.div`
  height: 536px;
  border: 1px solid #dddddd;

  ${mediaQueries.mobile} {
    display: none;
  }
`;

export const ChurchReportFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 0 8%;
  height: 66vh;
  max-height: 600px;
  overflow-y: scroll;

  & > p:first-child {
    color: #0d0f12;
  }

  & > p:nth-child(2) {
    color: #8d8d8d;
  }

  .half_width {
    width: 60%;
  }

  .mb-15 {
    margin-bottom: 15px;
  }

  .mb-20 {
    margin-bottom: 20px;
  }

  .mb-30 {
    margin-bottom: 30px;
  }

  .mb-50 {
    margin-bottom: 50px;
  }

  .mt-20 {
    margin-top: 20px;
  }

  .mt-30 {
    margin-top: 30px;
  }

  .mt-40 {
    margin-top: 40px;
  }

  .lh-30 {
    line-height: 30px;
  }

  ${mediaQueries.mobile} {
    padding: 0;
    width: 100%;
  }
`;

interface StepperRowProps {
  current?: boolean;
  completed?: boolean;
}

export const StepperRow = styled.div<StepperRowProps>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 6%;
  margin-bottom: 40px;

  & > p {
    font-size: 17px;
    margin-bottom: 0;
    margin-top: 1px;
    color: ${(props) => (props.current ? `#0D0F12` : `#8D8D8D`)};
    font-weight: ${(props) => (props.current ? "bold" : "normal")};
  }

  & > span {
    position: relative;
    display: inline-block;
    width: 25px;
    height: 25px;
    background-color: ${(props) => (props.completed ? `#3EA200` : `#ffffff`)};
    border-radius: 50%;
    border: ${(props) =>
    props.current
      ? `1px solid #0D0F12`
      : props.completed
        ? `none`
        : `1px solid #8D8D8D`};

    ::before {
      position: absolute;
      left: -1px;
      top: 45%;
      height: 24%;
      width: 3px;
      background-color: ${(props) =>
    props.current ? `#0D0F12` : props.completed ? `#ffffff` : `#8D8D8D`};
      content: "";
      transform: translateX(10px) rotate(-45deg);
      transform-origin: left bottom;
    }

    ::after {
      position: absolute;
      left: 0;
      bottom: 7px;
      height: 3px;
      width: 50%;
      background-color: ${(props) =>
    props.current ? `#0D0F12` : props.completed ? `#ffffff` : `#8D8D8D`};
      content: "";
      transform: translateX(10px) rotate(-45deg);
      transform-origin: left bottom;
    }
  }
`;

export const StepperConnector = styled.div`
  position: absolute;
  top: 100%;
  left: 11px;
  height: 50px;
  border: 1px solid #dddddd;
`;

export const Row = styled.div<props>`
  display: flex;
  justify-content: space-between;
  width: ${(props) => (props.width ? props.width : "90%")};

  & > .email_connector {
    margin-bottom: 20px;
    align-self: flex-end;
  }

  & > .extension_container {
    align-self: flex-end;
  }
`;

export const PasswordWrapper = styled.div`
  width: 45%;

  & > p {
    color: #1a1a1a;
  }
`;

export const InputWrapper = styled.div``;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  padding: 0 38px;
  background-color: #1a1a1a;
  width: 158px;
  height: 64px;
  border-radius: 5px;
  margin-top: 20px;

  & > p {
    color: #ffffff;
    margin-bottom: 0;
    font-size: 16px;
  }

  & > svg {
    width: 16px;
    height: 19px;
    transform: rotate(-90deg);
  }

  & > span {
    display: inline-block;
    width: 16px;
    height: 19px;
    transform: matrix(0, 1, -1, 0, 0, 0);
    background: #ffffff 0% 0% no-repeat padding-box;
  }
  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.7;
      cursor: not-allowed;
    `}

    ${mediaQueries.mobile} {
      width: 140px;
      height: 45px;
    }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: flex-end;

  & > button {
    margin-left: 65px;
  }
`;

export const CheckBoxWrapper = styled.div`
  width: fit-content;
`;

interface LabelProps {
  active?: boolean;
}

export const Label = styled.label<LabelProps>`
  display: flex;
  align-items: center;
  color: #8d8d8d;
  font-size: 18px;

  & > input {
    width: 30px;
    height: 30px;
    margin-right: 15px;
    accent-color: #3ea200;
  }

  & > p {
    font-weight: ${(props) => (props.active ? "bold" : "normal")};
    color: ${(props) => (props.active ? "#1A1A1A" : "#8D8D8D")};
  }
`;

export const LabelWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const AdminAccessFormWrapper = styled.div`
  width: 72%;

  & > p {
    color: #8d8d8d;
    width: 70%;
    cursor: pointer;
  }
`;

export const Section = styled.div`
  width: 55%;
`;

export const SectionRow = styled.div`
  display: grid;
  grid-template-columns: 200px repeat(1, 1fr);

  & > p {
    width: fit-content;
  }
`;

export const Edit = styled.p`
  color: #3ea200;
  text-decoration: underline;
  cursor: pointer;
`;

export const FinishButton = styled(Button)`
  width: 190px;
`;

export const RevokeButton = styled(Button)`
  width: 235px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CloseButton = styled(Button)`
  width: 129px;
  margin-top: 40%;
`;

export const BrokerTable = styled.table`
  table-layout: auto;
  font-size: 14px;
  border-collapse: collapse;
  tr {
    margin-top: 20px;
    font-size: 18px;
  }
  td,
  th {
    padding: 20px;
    text-align: start;
  }

  & svg {
    margin-left: 14px;
    height: 24px;
  }
`;

export const TableRow = styled.tr`
  border: 1px solid #e8e7e7;
  padding: 20px;
  margin: 30px 0px;
  color: #707070;
  font-size: 18px;
  background-color: #ffffff;
  cursor: pointer;
`;

export const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 15px;

  & > svg {
    width: 15px;
    height: 15px;
  }
`;

export const BrokerName = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BrokerAvatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 30px;
`;

export const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 180px;
  margin-left: 20px;
  width: 93%;
  gap: 25px;

  & > p:first-child {
    color: #000000;
  }
`;

export const DropdownContentContainer = styled.div`
  position: relative;
  width: fit-content;
`;

export const DropdownContent = styled.div`
  position: absolute;
  top: 190%;
  right: -232%;
  padding: 0 10px;
  width: max-content;
  background-color: #1a1a1a;
  box-shadow: 0px 3px 50px #0000001f;
  border-radius: 10px;
  z-index: 4;

  &:after {
    content: " ";
    position: absolute;
    bottom: 100%;
    right: 42%;
    margin-left: -5px;
    border-width: 15px;
    border-style: solid;
    border-color: transparent transparent #1a1a1a transparent;
  }

  & > p {
    color: #ffffff;
    padding: 15px 40px;
    margin: auto;
  }

  & > p:first-child {
    border-bottom: 1px solid #b7b7b7;
  }
`;

export const SuccessModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 140px 80px;
`;

export const SuccessModalContent = styled.div`
  width: 62%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > svg {
    margin-bottom: 20px;
  }

  & > p {
    text-align: center;
    color: #707070;
    line-height: 27px;
  }

  & > p:first-of-type {
    color: #1a1a1a;
    margin-bottom: 20px;
  }
`;

export const RevokeModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 80px;

  & > svg {
    margin-bottom: 30px;
  }

  & > p:first-of-type {
    color: #1a1a1a;
    margin-bottom: 20px;
  }

  & > p:nth-of-type(2) {
    margin-bottom: 120px;
    line-height: 27px;
    color: #707070;
  }

  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: flex-end;
    padding-bottom: 5px;
    width: 30px;
    height: 30px;
    background-color: #ffffff;
    font-size: 20px;
    border-radius: 50%;
    border: 1px solid #1a1a1a;
    color: #1a1a1a;
  }
`;

export const SectionPasswordContainer = styled.div`
  display: flex;
  align-items: center;

  & > p {
    display: inline-block;
    margin-right: 20px;
  }

  & > svg {
    width: 18px;
    height: 12px;
  }
`;

export const CreateUserFormBox = styled.form`
  display: flex;
  flex-direction: column;
`;

export const UserInputContainer = styled.div`
  display: flex;
  flex-direction: column;

  .error {
    color: #d90b2c;
    text-align: left;
  }
`;

interface UserInputProps {
  error?: string;
}

export const UserInputWrapper = styled.div<UserInputProps>`
  background-color: #f7f7f7;
  border-radius: 10px;
  padding: 0.5rem;
  width: 100%;
  height: 62px;
  justify-content: flex-start;
  border: ${(props) => props.error && `1px solid #d90b2c`};

  & > input {
    border: none;
    width: 100%;
    height: 100%;
    font-size: 18px;
    padding-left: 10px;
    padding-top: 5px;
    letter-spacing: 1px;
    outline: none;
  }
`;

export const SlidersBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const EntryWrapper = styled.div`
  position: relative;

  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 25px;
    height: 25px;
    color: #fff;
    font-size: 20px;
    border-radius: 50%;
    background-color: #000;
    cursor: pointer;
  }

  & .delete {
    font-size: 16px;
  }
`;

export const HorizontalDivider = styled.div`
  width: 30%;
  margin: 25px 0 10px;
  border-bottom: 1px solid #0b0146;
  opacity: 0.4;
`;
