import React, { useContext, useState } from "react";
import styled from "styled-components";
import mediaQueries from "../../../../mediaQueries";
import {
  ChurchInfoType,
  CurrencyTypes,
  OfferingEnum,
  offeringsFormat,
} from "../../../../types/appTypes";
import { findByInputName, handleFilterByInputName } from "../../../../utils";
import { ChurchReportContext } from "./churchReportContext";
import StyledInput from "./components/styledInput";

const offeringTypeMap = new Map<string, OfferingEnum>([
  ["offering", OfferingEnum.NORMAL],
  ["tithe", OfferingEnum.TITHE],
  ["seedFaith", OfferingEnum.SEED],
  ["projectBuilders", OfferingEnum.PROJECT],
  ["childDedication", OfferingEnum.CHILD_DEDICATION],
  ["firstFruit", OfferingEnum.FIRST_FRUIT],
  ["specialThanksgiving", OfferingEnum.SPECIAL],
  ["testimonyOffering", OfferingEnum.TESTIMONY],
  ["others", OfferingEnum.OTHERS],
]);

interface FinancialReportProps {
  goToNextPage: () => void;
}

const FinancialReport: React.FC<FinancialReportProps> = ({ goToNextPage }) => {
  const { churchReport, setChurchReport } = useContext(ChurchReportContext);

  const handleCurrencyChange = (selectedValue: any, name: string) => {
    if (!offeringTypeMap.has(name)) return;
    const mapValue = offeringTypeMap.get(name);
    const { offering: entry, index } = handleFilterByInputName(
      mapValue,
      churchReport.offerings
    );
    if (entry?.offering?.length) {
      entry.offering[0].currencyCode = selectedValue;
    } else {
      entry?.offering?.push({ currencyCode: selectedValue });
    }

    if (index > -1) {
      churchReport.offerings.splice(index, 1);
    }

    setChurchReport({
      ...churchReport,
      offerings: [...churchReport.offerings, entry],
    });
  };

  const handleForeignCurrencyChange = (selectedValue: any, name: string) => {
    if (!offeringTypeMap.has(name)) return;
    const mapValue = offeringTypeMap.get(name);
    const { offering: entry, index } = handleFilterByInputName(
      mapValue,
      churchReport.offerings
    );
    if (entry?.offering?.length === 2) {
      entry.offering[1].currencyCode = selectedValue;
    } else if (entry?.offering?.length === 1) {
      entry?.offering?.push({ currencyCode: selectedValue });
    } else {
      entry?.offering?.push({ currencyCode: CurrencyTypes.NGN, amount: "0" });
      entry?.offering?.push({ currencyCode: selectedValue });
    }

    if (index > -1) {
      churchReport.offerings.splice(index, 1);
    }

    setChurchReport({
      ...churchReport,
      offerings: [...churchReport.offerings, entry],
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    if (!offeringTypeMap.has(name)) return;

    const mapValue = offeringTypeMap.get(name);
    const { offering: entry, index } = handleFilterByInputName(
      mapValue,
      churchReport.offerings
    );
    if (entry?.offering?.length > 0 && entry.offering[0]) {
      if (!entry.offering[0].currencyCode) {
        entry.offering[0].currencyCode = CurrencyTypes.NGN;
      }
      entry.offering[0].amount = value;
    } else {
      entry.offering[0] = { amount: value, currencyCode: CurrencyTypes.NGN };
    }

    if (index > -1) {
      churchReport.offerings.splice(index, 1);
    }

    setChurchReport({
      ...churchReport,
      offerings: [...churchReport.offerings, entry],
    });
  };

  const handleForeignOffering = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    if (!offeringTypeMap.has(name)) return;
    const mapValue = offeringTypeMap.get(name);
    const { offering: entry, index } = handleFilterByInputName(
      mapValue,
      churchReport.offerings
    );
    if (entry?.offering?.length === 2) {
      entry.offering[1].amount = value;
    } else {
      entry.offering[0] = { amount: "0", currencyCode: CurrencyTypes.NGN };
      entry.offering[1] = { amount: value, currencyCode: CurrencyTypes.NGN };
    }

    if (index > -1) {
      churchReport.offerings.splice(index, 1);
    }
    setChurchReport({
      ...churchReport,
      offerings: [...churchReport.offerings, entry],
    });
  };

  const handleGoToNextPage = () => {
    setChurchReport(churchReport);
    goToNextPage();
  };

  console.log(churchReport);

  return (
    <Container>
      <Title>Financial Report</Title>
      <Form>
        <Row>
          <EntryContainer width={47}>
            <p>Normal Offering</p>
            <InputWrapper>
              <StyledInput
                name="offering"
                width={49}
                type="number"
                handleCurrencyChange={handleCurrencyChange}
                onChange={handleChange}
                valueFromContext={
                  findByInputName(OfferingEnum.NORMAL, churchReport.offerings)
                    ?.offering?.[0]?.currencyCode || CurrencyTypes.NGN
                }
                defaultValue={
                  findByInputName(OfferingEnum.NORMAL, churchReport.offerings)
                    ?.offering?.[0]?.amount || ""
                }
              />
              <StyledInput
                name="offering"
                width={49}
                type="number"
                handleCurrencyChange={handleForeignCurrencyChange}
                onChange={handleForeignOffering}
                valueFromContext={
                  findByInputName(OfferingEnum.NORMAL, churchReport.offerings)
                    ?.offering?.[1]?.currencyCode || CurrencyTypes.NGN
                }
                defaultValue={
                  findByInputName(OfferingEnum.NORMAL, churchReport.offerings)
                    ?.offering?.[1]?.amount || ""
                }
              />
            </InputWrapper>
          </EntryContainer>
          <EntryContainer width={47}>
            <p>Tithe Offering</p>
            <InputWrapper>
              <StyledInput
                name="tithe"
                width={49}
                type="number"
                handleCurrencyChange={handleCurrencyChange}
                onChange={handleChange}
                valueFromContext={
                  findByInputName(OfferingEnum.TITHE, churchReport.offerings)
                    ?.offering?.[0]?.currencyCode || CurrencyTypes.NGN
                }
                defaultValue={
                  findByInputName(OfferingEnum.TITHE, churchReport.offerings)
                    ?.offering?.[0]?.amount || ""
                }
              />
              <StyledInput
                name="tithe"
                width={49}
                type="number"
                handleCurrencyChange={handleForeignCurrencyChange}
                onChange={handleForeignOffering}
                valueFromContext={
                  findByInputName(OfferingEnum.TITHE, churchReport.offerings)
                    ?.offering?.[1]?.currencyCode || CurrencyTypes.NGN
                }
                defaultValue={
                  findByInputName(OfferingEnum.TITHE, churchReport.offerings)
                    ?.offering?.[1]?.amount || ""
                }
              />
            </InputWrapper>
          </EntryContainer>
        </Row>
        <Row>
          <EntryContainer width={47}>
            <p>Seed Faith</p>
            <InputWrapper>
              <StyledInput
                name="seedFaith"
                width={49}
                type="number"
                handleCurrencyChange={handleCurrencyChange}
                onChange={handleChange}
                valueFromContext={
                  findByInputName(OfferingEnum.SEED, churchReport.offerings)
                    ?.offering?.[0]?.currencyCode || CurrencyTypes.NGN
                }
                defaultValue={
                  findByInputName(OfferingEnum.SEED, churchReport.offerings)
                    ?.offering?.[0]?.amount || ""
                }
              />
              <StyledInput
                name="seedFaith"
                width={49}
                type="number"
                handleCurrencyChange={handleForeignCurrencyChange}
                onChange={handleForeignOffering}
                valueFromContext={
                  findByInputName(OfferingEnum.SEED, churchReport.offerings)
                    ?.offering?.[1]?.currencyCode || CurrencyTypes.NGN
                }
                defaultValue={
                  findByInputName(OfferingEnum.SEED, churchReport.offerings)
                    ?.offering?.[1]?.amount || ""
                }
              />
            </InputWrapper>
          </EntryContainer>
          <EntryContainer width={47}>
            <p>Project Builders</p>
            <InputWrapper>
              <StyledInput
                name="projectBuilders"
                width={49}
                type="number"
                handleCurrencyChange={handleCurrencyChange}
                onChange={handleChange}
                valueFromContext={
                  findByInputName(OfferingEnum.PROJECT, churchReport.offerings)
                    ?.offering?.[0]?.currencyCode || CurrencyTypes.NGN
                }
                defaultValue={
                  findByInputName(OfferingEnum.PROJECT, churchReport.offerings)
                    ?.offering?.[0]?.amount || ""
                }
              />
              <StyledInput
                name="projectBuilders"
                width={49}
                type="number"
                handleCurrencyChange={handleForeignCurrencyChange}
                onChange={handleForeignOffering}
                valueFromContext={
                  findByInputName(OfferingEnum.PROJECT, churchReport.offerings)
                    ?.offering?.[1]?.currencyCode || CurrencyTypes.NGN
                }
                defaultValue={
                  findByInputName(OfferingEnum.PROJECT, churchReport.offerings)
                    ?.offering?.[1]?.amount || ""
                }
              />
            </InputWrapper>
          </EntryContainer>
        </Row>
        <Row>
          <EntryContainer width={47}>
            <p>Child Dedication</p>
            <InputWrapper>
              <StyledInput
                name="childDedication"
                width={49}
                type="number"
                handleCurrencyChange={handleCurrencyChange}
                onChange={handleChange}
                valueFromContext={
                  findByInputName(
                    OfferingEnum.CHILD_DEDICATION,
                    churchReport.offerings
                  )?.offering?.[0]?.currencyCode || CurrencyTypes.NGN
                }
                defaultValue={
                  findByInputName(
                    OfferingEnum.CHILD_DEDICATION,
                    churchReport.offerings
                  )?.offering?.[0]?.amount || ""
                }
              />
              <StyledInput
                name="childDedication"
                width={49}
                type="number"
                handleCurrencyChange={handleForeignCurrencyChange}
                onChange={handleForeignOffering}
                valueFromContext={
                  findByInputName(
                    OfferingEnum.CHILD_DEDICATION,
                    churchReport.offerings
                  )?.offering?.[1]?.currencyCode || CurrencyTypes.NGN
                }
                defaultValue={
                  findByInputName(
                    OfferingEnum.CHILD_DEDICATION,
                    churchReport.offerings
                  )?.offering?.[1]?.amount || ""
                }
              />
            </InputWrapper>
          </EntryContainer>
          <EntryContainer width={47}>
            <p>First Fruit</p>
            <InputWrapper>
              <StyledInput
                name="firstFruit"
                width={49}
                type="number"
                handleCurrencyChange={handleCurrencyChange}
                onChange={handleChange}
                valueFromContext={
                  findByInputName(
                    OfferingEnum.FIRST_FRUIT,
                    churchReport.offerings
                  )?.offering?.[0]?.currencyCode || CurrencyTypes.NGN
                }
                defaultValue={
                  findByInputName(
                    OfferingEnum.FIRST_FRUIT,
                    churchReport.offerings
                  )?.offering?.[0]?.amount || ""
                }
              />
              <StyledInput
                name="firstFruit"
                width={49}
                type="number"
                handleCurrencyChange={handleForeignCurrencyChange}
                onChange={handleForeignOffering}
                valueFromContext={
                  findByInputName(
                    OfferingEnum.FIRST_FRUIT,
                    churchReport.offerings
                  )?.offering?.[1]?.currencyCode || CurrencyTypes.NGN
                }
                defaultValue={
                  findByInputName(
                    OfferingEnum.FIRST_FRUIT,
                    churchReport.offerings
                  )?.offering?.[1]?.amount || ""
                }
              />
            </InputWrapper>
          </EntryContainer>
        </Row>
        <Row>
          <EntryContainer width={47}>
            <p>Special Thanksgiving</p>
            <InputWrapper>
              <StyledInput
                name="specialThanksgiving"
                width={49}
                type="number"
                handleCurrencyChange={handleCurrencyChange}
                onChange={handleChange}
                valueFromContext={
                  findByInputName(OfferingEnum.SPECIAL, churchReport.offerings)
                    ?.offering?.[0]?.currencyCode || CurrencyTypes.NGN
                }
                defaultValue={
                  findByInputName(OfferingEnum.SPECIAL, churchReport.offerings)
                    ?.offering?.[0]?.amount || ""
                }
              />
              <StyledInput
                name="specialThanksgiving"
                width={49}
                type="number"
                handleCurrencyChange={handleForeignCurrencyChange}
                onChange={handleForeignOffering}
                valueFromContext={
                  findByInputName(OfferingEnum.SPECIAL, churchReport.offerings)
                    ?.offering?.[1]?.currencyCode || CurrencyTypes.NGN
                }
                defaultValue={
                  findByInputName(OfferingEnum.SPECIAL, churchReport.offerings)
                    ?.offering?.[1]?.amount || ""
                }
              />
            </InputWrapper>
          </EntryContainer>
          <EntryContainer width={47}>
            <p>Testimony Offering</p>
            <InputWrapper>
              <StyledInput
                name="testimonyOffering"
                width={49}
                type="number"
                handleCurrencyChange={handleCurrencyChange}
                onChange={handleChange}
                valueFromContext={
                  findByInputName(
                    OfferingEnum.TESTIMONY,
                    churchReport.offerings
                  )?.offering?.[0]?.currencyCode || CurrencyTypes.NGN
                }
                defaultValue={
                  findByInputName(
                    OfferingEnum.TESTIMONY,
                    churchReport.offerings
                  )?.offering?.[0]?.amount || ""
                }
              />
              <StyledInput
                name="testimonyOffering"
                width={49}
                type="number"
                handleCurrencyChange={handleForeignCurrencyChange}
                onChange={handleForeignOffering}
                valueFromContext={
                  findByInputName(
                    OfferingEnum.TESTIMONY,
                    churchReport.offerings
                  )?.offering?.[1]?.currencyCode || CurrencyTypes.NGN
                }
                defaultValue={
                  findByInputName(
                    OfferingEnum.TESTIMONY,
                    churchReport.offerings
                  )?.offering?.[1]?.amount || ""
                }
              />
            </InputWrapper>
          </EntryContainer>
        </Row>
        <Row>
          <EntryContainer width={47}>
            <p>Others</p>
            <InputWrapper>
              <StyledInput
                name="others"
                width={49}
                type="number"
                handleCurrencyChange={handleCurrencyChange}
                onChange={handleChange}
                valueFromContext={
                  findByInputName(OfferingEnum.OTHERS, churchReport.offerings)
                    ?.offering?.[0]?.currencyCode || CurrencyTypes.NGN
                }
                defaultValue={
                  findByInputName(OfferingEnum.OTHERS, churchReport.offerings)
                    ?.offering?.[0]?.amount || ""
                }
              />
              <StyledInput
                name="others"
                width={49}
                type="number"
                handleCurrencyChange={handleForeignCurrencyChange}
                onChange={handleForeignOffering}
                valueFromContext={
                  findByInputName(OfferingEnum.OTHERS, churchReport.offerings)
                    ?.offering?.[1]?.currencyCode || CurrencyTypes.NGN
                }
                defaultValue={
                  findByInputName(OfferingEnum.OTHERS, churchReport.offerings)
                    ?.offering?.[1]?.amount || ""
                }
              />
            </InputWrapper>
          </EntryContainer>
        </Row>
        <ButtonWrapper>
          <Button onClick={handleGoToNextPage}>
            <p>Next</p>
            <img src="/images/next-icon.png" alt="" />
          </Button>
        </ButtonWrapper>
      </Form>
    </Container>
  );
};

export default FinancialReport;

const Container = styled.div``;

export const Title = styled.p`
  font-size: 18px;
  color: #0d0f12;
  font-weight: bold;

  ${mediaQueries.mobile} {
    margin-bottom: 10px;
  }
`;

export const Form = styled.form``;
export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;

  ${mediaQueries.mobile} {
    flex-direction: column;
    gap: 15px;
  }
`;

interface InputWrapperProps {
  width?: number;
}

export const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  justify-content: space-between;
  width: ${(props) => (props.width ? `${props.width}%` : "100%")};

  ${mediaQueries.mobile} {
    gap: 15px;
    flex-wrap: wrap;
  }
`;

interface EntryContainerProps {
  width?: number;
}

export const EntryContainer = styled.div<EntryContainerProps>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.width ? `${props.width}%` : "100%")};

  & > div {
    display: flex;
    justify-content: space-between;
  }

  & > p {
    margin-bottom: 5px;
    font-size: 16px;
    color: #0d0f12;
  }

  ${mediaQueries.mobile} {
    width: 100%;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 10px;
`;

export const Button = styled.button`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  padding: 0px 28px;
  background-color: #1a1a1a;
  width: 140px;
  height: 50px;
  border-radius: 5px;

  & > p {
    color: #ffffff;
    font-size: 18px;
    margin-bottom: 0;
  }

  & > img {
    width: 16px;
    height: 19px;
  }

  & > .backBtn {
    transform: rotate(-180deg);
  }
`;
