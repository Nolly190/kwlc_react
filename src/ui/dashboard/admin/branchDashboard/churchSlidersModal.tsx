import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getSliderDetailsApi,
  uploadSliderDetailsApi,
} from "../../../../api/report.api";
import Modal from "../../../../components/modal";
import { statusEnum } from "../../../../enums/util.enum";
import { getToken } from "../../../../request";
import { SliderType } from "../../../../types/appTypes";
import { getFromLocalStorage } from "../../../../utils";
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
}

const initialState = {
  url: "",
  text: "",
};

const initialProp: SliderType = {
  isDynamic: true,
  type: "",
  sliderImages: [initialState],
};

const ChurchSlidersModal: React.FC<props> = ({ isOpen, closeModal }) => {
  const [sliderData, setSliderData] = useState<SliderType>(initialProp);

  useEffect(() => {
    async function getSlider() {
      const response = await getSliderDetailsApi();
      if (response.code === statusEnum.ok) {
        setSliderData(response?.data?.data);
      } else {
        toast.error(response.message);
      }
    }
    getSlider();
  }, []);

  const handleClose = () => {
    closeModal();
  };

  const handleAdd = () => {
    const newEntry = {
      url: "",
      text: "",
    };

    setSliderData({
      ...sliderData,
      sliderImages: [...sliderData.sliderImages, newEntry],
    });
  };

  const handleDelete = (index: number) => {
    sliderData?.sliderImages.splice(index, 1);
    setSliderData({
      ...sliderData,
      sliderImages: [...sliderData.sliderImages],
    });
  };

  const clearButtonData = (index: number) => {
    sliderData.sliderImages[index].bottonUrl = "";
    sliderData.sliderImages[index].buttomName = "";

    setSliderData({
      ...sliderData,
      sliderImages: [...sliderData.sliderImages],
    });
  };

  const handleChange = (name: string, value: string, index: number) => {
    sliderData.sliderImages[index][name] = value;

    setSliderData({
      ...sliderData,
      sliderImages: [...sliderData.sliderImages],
    });
  };

  const handleSubmit = async () => {
    const response = await uploadSliderDetailsApi(sliderData);
    if (response.code >= statusEnum.ok) {
      toast.success("Details uploaded successfully");
      closeModal();
    } else {
      toast.error(response.message);
    }
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
          {sliderData?.sliderImages.map((image, index) => (
            <EntryWrapper key={index}>
              <Row width="100%">
                <EntryContainer width={47}>
                  <p>Image Url</p>
                  <InputWrapper>
                    <StyledInput
                      name="url"
                      width={100}
                      value={image.url || ""}
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value, index)
                      }
                    />
                  </InputWrapper>
                </EntryContainer>
                <EntryContainer width={47}>
                  <p>Image Text</p>
                  <InputWrapper>
                    <StyledInput
                      name="text"
                      width={100}
                      value={image.text || ""}
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value, index)
                      }
                    />
                  </InputWrapper>
                </EntryContainer>
              </Row>
              <ButtonDetails
                index={index}
                buttonName={image.buttomName || ""}
                buttonUrl={image.bottonUrl || ""}
                setSliderData={setSliderData}
                sliderData={sliderData}
                hasButton={image.hasButton}
                onChange={(e) =>
                  handleChange(e.target.name, e.target.value, index)
                }
                clearButtonData={() => clearButtonData(index)}
              />
              <HorizontalDivider />
              {sliderData?.sliderImages?.length - 1 === index ? (
                <span onClick={() => handleAdd()}>+</span>
              ) : (
                <span className="delete" onClick={() => handleDelete(index)}>
                  x
                </span>
              )}
            </EntryWrapper>
          ))}
          <ButtonWrapper>
            <Button onClick={handleSubmit}>
              <p>Submit</p>
            </Button>
          </ButtonWrapper>
        </SlidersBodyWrapper>
      </SlidersModalContainer>
    </Modal>
  );
};

export default ChurchSlidersModal;
