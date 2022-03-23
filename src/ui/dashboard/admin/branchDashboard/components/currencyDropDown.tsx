import React, { useState } from "react";
import styled from "styled-components";
import { CurrencyTypes } from "../../../../../types/appTypes";

interface DropDownProp {
  name?: string;
  selectedValue: CurrencyTypes | undefined;
  setSelectedValue?: (value: CurrencyTypes) => void;
  handleCurrencyChange: (selectedValue: any, name: string) => void;
}

const CurrencyDropDown: React.FC<DropDownProp> = ({
  selectedValue,
  setSelectedValue,
  handleCurrencyChange,
  name,
}) => {
  const [show, setshow] = useState(false);

  const handleClick = (value: CurrencyTypes, name: string) => {
    handleCurrencyChange(value, name);
    setSelectedValue(value);
    toggleShow();
  };

  const toggleShow = () => {
    setshow(!show);
  };

  return (
    <Container>
      <UserDropdownBlock onClick={() => toggleShow()}>
        <p>
          {CurrencyTypes[selectedValue] || CurrencyTypes[CurrencyTypes.NGN]}
        </p>
      </UserDropdownBlock>

      {show && (
        <DropdownContentContainer>
          <div onClick={() => handleClick(CurrencyTypes.NGN, name)}>NGN</div>
          <div onClick={() => handleClick(CurrencyTypes.USD, name)}>USD</div>
          <div onClick={() => handleClick(CurrencyTypes.GBP, name)}>GBP</div>
          <div onClick={() => handleClick(CurrencyTypes.EUR, name)}>EUR</div>
        </DropdownContentContainer>
      )}
    </Container>
  );
};

export default CurrencyDropDown;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 35%;
`;

const UserDropdownBlock = styled.div`
  background-color: #f7f7f7;
  border-radius: 10px;
  padding: 0.5rem 0.7rem;
  display: flex;
  width: 100%;
  height: 55px;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & > img {
    width: 16px;
    height: 16px;
    transform: rotate(-90deg);
    color: #000;
  }

  & > p {
    margin-bottom: 0;
  }
`;

const DropdownContentContainer = styled.div`
  position: absolute;
  top: 130%;
  background-color: #fdfdfd;
  box-shadow: 0px 3px 10px #0000001f;
  z-index: 4;

  & > div {
    padding: 10px;
    cursor: pointer;
  }

  & > div:hover {
    background: #707070;
    color: #ffffff;
  }
`;
