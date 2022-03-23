import React, { useEffect, useState } from "react";
import Modal from "../../../../components/modal";
import { SliderType } from "../../../../types/appTypes";
import ButtonDetails from "./components/ButtonDetails";
import StyledInput from "./components/styledInput";
import { EntryContainer } from "./financialReport";
import {
  Button,
  ButtonWrapper,
  EntryWrapper,
  HorizontalDivider,
  InputWrapper,
  ModalContainer,
  ModalHeaderContainer,
  NewUserHeader,
  Row,
  SlidersBodyWrapper,
  SlidersModalContainer,
  SlidersModalHeaderContainer,
} from "./styles";

interface props {
  isOpen: boolean;
  closeModal: () => void;
  handleSubmit?: () => void;
}

const newEntry = {
  url: "",
  text: "",
};

const initialProp: SliderType = {
  sliderImages: [newEntry],
};

const ChurchSlidersModal: React.FC<props> = ({
  isOpen,
  closeModal,
  handleSubmit,
}) => {
  const [sliderData, setSliderData] = useState<SliderType>(initialProp);

  const handleClose = () => {
    closeModal();
  };

  const handleAdd = () => {
    console.log("got here");

    setSliderData({
      ...sliderData,
      sliderImages: [...sliderData.sliderImages, newEntry],
    });
  };

  useEffect(() => {
    return () => {
      console.log("changed");
    };
  }, []);

  console.log("images", sliderData);

  const handleChange = (e: any) => {
    console.log("value", e.target.value, e.target.name);
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <SlidersModalContainer width="60vw">
        <SlidersModalHeaderContainer>
          <NewUserHeader>
            <p>Upload Church Sliders</p>
            <span></span>
          </NewUserHeader>
          <span onClick={() => handleClose()}>x</span>
        </SlidersModalHeaderContainer>
        <SlidersBodyWrapper>
          {sliderData.sliderImages.map((image, index) => (
            <EntryWrapper key={index}>
              <Row width="100%">
                <EntryContainer width={47}>
                  <p>Image Url</p>
                  <InputWrapper>
                    <StyledInput
                      name="url"
                      width={100}
                      defaultValue={image.url || ""}
                      onChange={handleChange}
                    />
                  </InputWrapper>
                </EntryContainer>
                <EntryContainer width={47}>
                  <p>Image Text</p>
                  <InputWrapper>
                    <StyledInput
                      name="text"
                      width={100}
                      defaultValue={image.text || ""}
                      onChange={handleChange}
                    />
                  </InputWrapper>
                </EntryContainer>
              </Row>
              <ButtonDetails onChange={handleChange} />
              <HorizontalDivider />
            </EntryWrapper>
          ))}
          <ButtonWrapper>
            <Button onClick={handleAdd}>
              <p> + Add New</p>
            </Button>
          </ButtonWrapper>
        </SlidersBodyWrapper>
      </SlidersModalContainer>
    </Modal>
  );
};

export default ChurchSlidersModal;
