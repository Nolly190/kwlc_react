import React, { useRef, useState } from "react";
import AdminLayout from "../../src/ui/dashboard/admin/admin.layout";
import styled from "styled-components";
import Image from "next/image";
import ChurchReportModal from "../../src/ui/dashboard/admin/branchDashboard/churchReportModal";
import { Editor } from "@tinymce/tinymce-react";
import mediaQueries from "../../src/mediaQueries";
import ChurchSlidersModal from "../../src/ui/dashboard/admin/branchDashboard/churchSlidersModal";

const AdminBranchDashboard = () => {
  const [imageToDisplayArray, setImageToDisplayArray] = useState<string[]>([]);
  const [imageToUploadArray, setImageToUploadArray] = useState<File[]>([]);
  const [pastorImageToDisplay, setPastorImageToDisplay] = useState<string>("");
  const [pastorImageToUpload, setPastorImageToUpload] = useState<File>();
  const [reportModalIsOpen, setReportModalIsOpen] = useState(false);
  const [sliderModalIsOpen, setSliderModalIsOpen] = useState(false);
  const [eventModalIsOpen, setEventModalIsOpen] = useState(false);
  const editorRef = useRef(null);

  const log = (e: any) => {
    console.log("markup", e.target.getContent());
  };

  const handleToggleReportModal = () => {
    setReportModalIsOpen(!reportModalIsOpen);
  };

  const handleToggleSliderModal = () => {
    setSliderModalIsOpen(!sliderModalIsOpen);
  };

  const handleToggleEventsModal = () => {
    setEventModalIsOpen(!eventModalIsOpen);
  };

  const selectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let file = e.target.files[0];
      if (file.type.includes("image")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", (event) => {
          if (event.target && event.target.result) {
            setImageToDisplayArray([
              ...imageToDisplayArray,
              event.target.result.toString(),
            ]);
            setImageToUploadArray([...imageToUploadArray, file]);
          }
        });
      }
    }
  };

  const selectPastorImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let file = e.target.files[0];
      if (file.type.includes("image")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", (event) => {
          if (event.target && event.target.result) {
            setPastorImageToDisplay(event.target.result.toString());
            setPastorImageToUpload(file);
          }
        });
      }
    }
  };

  console.log(imageToUploadArray);

  return (
    <AdminLayout
      externalStyles={[]}
      navbar={""}
      title={"Dashboard"}
      withFooter={false}
      withSideBar={true}
    >
      <Container>
        <MainContentContainer>
          <TopImageWrapper>
            <Image src="/images/church-image.png" alt="" layout="fill" />
          </TopImageWrapper>
          <ContentWrapper>
            <LeftContentWrapper>
              <PastorImageWrapper>
                <Image
                  src={pastorImageToDisplay || "/images/pastor-image.png"}
                  alt=""
                  layout="fill"
                />
                <input
                  type="file"
                  id="pastor-image"
                  accept="image/png image/jpg"
                  onChange={selectPastorImage}
                />
                <img
                  src="/images/edit-icon.svg"
                  alt=""
                  onClick={() =>
                    document.getElementById("pastor-image").click()
                  }
                />
              </PastorImageWrapper>
              <PastorInputWrapper>
                <input type="text" value="Faith Chukwu" />
                <img src="/images/pencil.svg" alt="" />
                <p>Lead pastor</p>
              </PastorInputWrapper>
            </LeftContentWrapper>
            <RightContentWrapper>
              <h2>Edit welcome note</h2>
              <WelcomeNoteWrapper>
                {/* <img src="/images/pencil.svg" alt="" /> */}
                <Editor
                  apiKey={"xp4d02qcjritg0ucudzbasrhjribhh7wy9ck49nlxl78l8n0"}
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  init={{
                    height: 250,
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | " +
                      "bold italic backcolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                  onChange={log}
                />
                {/* Hello people, My Name is Faith chukwu, the lead pastor in
                kingdom ways living church international. It’s my humble
                pleasure to welcome you to our world. In Matthew, Jesus said to
                peter fear not just follow me and I will make you… One major
                assignment of Jesus Christ through His church is the Making of
                great destinies. Welcome! I celebrate you.{" "} */}
              </WelcomeNoteWrapper>
            </RightContentWrapper>
          </ContentWrapper>
          {/* <ImageSection>
            <h2>Church Image</h2>
            <div>
              <ImagesContainer>
                {imageToDisplayArray.map((image, index) => (
                  <ImageWrapper key={index}>
                    <Image src={image} alt="" layout="fill" />
                  </ImageWrapper>
                ))}
              </ImagesContainer>
              <InputWrapper
                onClick={() => document.getElementById("fileUpload")?.click()}
              >
                <input
                  type="file"
                  onChange={selectImage}
                  id="fileUpload"
                  accept="image/png image/jpg"
                />
                <img src="/images/add.svg" alt="" />
              </InputWrapper>
            </div>
          </ImageSection> */}
          <ActionButtonsWrapper>
            <ActionButtons>Preview</ActionButtons>
            <ActionButtons color="blue">Save</ActionButtons>
          </ActionButtonsWrapper>
        </MainContentContainer>
        <AsideContentContainer>
          <AsideContentBox>
            <h2>Church Report</h2>
            <p>Click on update to upload the church report for today</p>
            <ActionButtons color="blue" onClick={handleToggleReportModal}>
              Update
            </ActionButtons>
          </AsideContentBox>
          <AsideContentBox>
            <h2>Branch Sliders</h2>
            <p>Click on upload to upload the branch sliders</p>
            <ActionButtons color="blue" onClick={handleToggleSliderModal}>
              Upload
            </ActionButtons>
          </AsideContentBox>
          <AsideContentBox>
            <h2>Events</h2>
            <p>Click on upload to upload events for HQ</p>
            <ActionButtons color="blue" onClick={handleToggleEventsModal}>
              Upload
            </ActionButtons>
          </AsideContentBox>
        </AsideContentContainer>
      </Container>
      {reportModalIsOpen && (
        <ChurchReportModal
          isOpen={reportModalIsOpen}
          closeModal={handleToggleReportModal}
        />
      )}
      {sliderModalIsOpen && (
        <ChurchSlidersModal
          isOpen={sliderModalIsOpen}
          closeModal={handleToggleSliderModal}
        />
      )}
    </AdminLayout>
  );
};

export default AdminBranchDashboard;

const Container = styled.div`
  display: flex;
  gap: 20px;

  ${mediaQueries.mobile} {
    flex-direction: column-reverse;
  }
`;

const MainContentContainer = styled.div`
  width: 70%;
  background-color: #fff;
  padding: 16px;

  ${mediaQueries.mobile} {
    width: 100%;
  }
`;

const AsideContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 30%;
`;

const AsideContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 200px;
  padding: 20px;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(119, 182, 213, 0.5);
  border-radius: 10px;

  & > h2 {
    width: 155px;
    height: 22px;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    color: #000000;
  }

  & > p {
    font-weight: 300;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    color: #000000;
  }

  & > button {
    width: 100%;
  }

  ${mediaQueries.mobile} {
    width: 100%;
    height: auto;

    & > h2 {
      display: none;
    }
  }
`;

const TopImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 155px;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 25px;

  ${mediaQueries.mobile} {
    flex-direction: column;
  }
`;

const LeftContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${mediaQueries.mobile} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const PastorImageWrapper = styled.div`
  position: relative;
  width: 153px;
  height: 112px;
  margin-bottom: 6px;

  & > input {
    display: none;
  }

  & > img {
    position: absolute;
    top: 35%;
    left: 40%;
    width: 30px;
    height: 30px;
  }

  ${mediaQueries.mobile} {
    width: 47%;
  }
`;

const PastorInputWrapper = styled.div`
  position: relative;

  & > input {
    width: 153px;
    height: 35px;
    padding-left: 12px;
    border: none;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
    color: #000000;
    background: rgba(0, 0, 0, 0.03);
    border-radius: 10px;
  }

  & > img {
    position: absolute;
    top: 13px;
    right: 12px;
    width: 8px;
    height: 8px;
  }

  & > p {
    font-size: 12px;
    line-height: 14px;
    text-align: center;
  }

  ${mediaQueries.mobile} {
    width: 47%;

    & > input {
      width: 100%;
    }

    & > p {
      text-align: left;
    }
  }
`;

const RightContentWrapper = styled.div`
  flex-grow: 1;
  max-width: 75%;

  & > h2 {
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    color: #000000;
  }

  ${mediaQueries.mobile} {
    max-width: 100%;
  }
`;

const WelcomeNoteWrapper = styled.div`
  position: relative;
  width: 99%;
  height: 251px;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 10px;

  & > img {
    position: absolute;
    top: 13px;
    right: 12px;
    width: 10px;
    height: 10px;
  }
`;

const ImageSection = styled.section`
  margin-top: 40px;

  & > h2 {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 15px;
    line-height: 22px;
    color: #000000;
  }

  & > div {
    display: flex;
    gap: 20px;
  }
`;

const ImagesContainer = styled.div`
  display: flex;
  gap: 15px;
  max-width: 89%;
  overflow-x: scroll;
  display: flex;
  list-style-type: none;

  &::-webkit-scrollbar {
    background: transparent;
    width: 1px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 10px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  min-width: 175px;
  height: 128px;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 47px;
  height: 42px;
  background: #ffffff;
  box-shadow: 1px 1px 5px 2px rgba(119, 182, 213, 0.2);
  border-radius: 10px;

  & > input {
    display: none;
  }

  & > svg {
    width: 24px;
    height: 24px;
  }
`;

const ActionButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;

interface ButtonProps {
  color?: string;
}

const ActionButtons = styled.button<ButtonProps>`
  width: 270px;
  height: 54px;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 10px;
  cursor: pointer;
  background-color: ${(props) => (props.color === "blue" ? "#0b0146" : "#fff")};
  color: ${(props) => (props.color === "blue" ? "#fff" : "#0b0146")};

  ${mediaQueries.mobile} {
    width: 130px;
    height: 50px;
  }
`;
