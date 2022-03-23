import React, { useContext, useState } from "react";
import styled from "styled-components";
import { CurrencyTypes } from "../../../../../types/appTypes";
import { ChurchReportContext } from "../churchReportContext";
import CurrencyDropDown from "./currencyDropDown";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type?: string;
  width?: number;
  valueFromContext?: CurrencyTypes;
  handleCurrencyChange?: (selectedValue: any, name: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledInput = (props: Props) => {
  const {
    type,
    name,
    width,
    handleCurrencyChange,
    valueFromContext,
    onChange,
    ...rest
  } = props;
  const [selectedValue, setSelectedValue] = useState<CurrencyTypes>();
  const { churchReport } = useContext(ChurchReportContext);

  return (
    <InputWrapper width={width} empty={!!!handleCurrencyChange}>
      {handleCurrencyChange && (
        <CurrencyDropDown
          selectedValue={valueFromContext || selectedValue}
          setSelectedValue={setSelectedValue}
          handleCurrencyChange={handleCurrencyChange}
          name={name}
        />
      )}
      <input
        type={type || "text"}
        name={name}
        {...rest}
        onChange={(e) => (onChange != null ? onChange(e) : null)}
      />
    </InputWrapper>
  );
};

export default StyledInput;

interface InputProps {
  width?: number;
  empty?: boolean;
}

const InputWrapper = styled.div<InputProps>`
  position: relative;
  background-color: #f7f7f7;
  border-radius: 10px;
  padding: 0.3rem;
  height: 55px;
  justify-content: flex-start;
  width: ${(props) => (props.width ? `${props.width}%` : "100%")};

  & > input {
    border: none;
    width: 100%;
    height: 100%;
    font-size: 16px;
    padding-left: ${(props) => (props.empty ? "8px" : "55px")};
    letter-spacing: 1px;
    outline: none;
  }
`;
