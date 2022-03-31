import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SliderType } from "../../../../../types/appTypes";
import { EntryContainer } from "../financialReport";
import { InputWrapper, Row } from "../styles";
import StyledInput from "./styledInput";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonName?: string;
  buttonUrl?: string;
  hasButton?: boolean;
  index?: number;
  clearButtonData?: (index: number) => void;
  sliderData?: SliderType;
  setSliderData?: (sliderData: SliderType) => void;
}

const ButtonDetails = (props: Props) => {
  const {
    onChange,
    buttonName,
    buttonUrl,
    hasButton,
    index,
    clearButtonData,
    sliderData,
    setSliderData,
  } = props;
  const [show, setShow] = useState(false);

  const handleToggle = () => {
    clearButtonData(index);
    setShow(!show);
  };

  useEffect(() => {
    sliderData.sliderImages[index].hasButton = show;
    setSliderData({
      ...sliderData,
      sliderImages: [...sliderData.sliderImages],
    });
  }, [show]);

  return (
    <Container>
      <label>
        <input type="checkbox" onChange={() => handleToggle()} /> Add button
      </label>
      {(show || hasButton) && (
        <Row width="60%">
          <EntryContainer width={37}>
            <p>Button Label</p>
            <InputWrapper>
              <StyledInput
                name="buttomName"
                value={buttonName}
                width={100}
                onChange={onChange}
              />
            </InputWrapper>
          </EntryContainer>
          <EntryContainer width={60}>
            <p>Button Url</p>
            <InputWrapper>
              <StyledInput
                name="bottonUrl"
                value={buttonUrl}
                width={100}
                onChange={onChange}
              />
            </InputWrapper>
          </EntryContainer>
        </Row>
      )}
    </Container>
  );
};

export default ButtonDetails;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  & > label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: #0d0f12;
    font-size: 16px;
    width: fit-content;

    input {
      width: 16px;
      height: 16px;
      accent-color: #0b0146;
    }
  }
`;
