import React, { useState } from 'react'
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { confirmPublishersPaymentApi, ValidatePaymentRefApi } from '../../../../../api/publishers.api';
import Modal from '../../../../../components/modal'
import { statusEnum } from '../../../../../enums/util.enum';
import mediaQueries from '../../../../../mediaQueries';
import { ValidatePaymentRefResponse } from '../../../../../types/appTypes';
import { StyledButton, NewUserHeader, SlidersModalContainer, SlidersModalHeaderContainer } from '../../branchDashboard/styles';

interface props {
    isOpen: boolean;
    closeModal: () => void;
}

const PaymentValidationModal: React.FC<props> = ({ isOpen, closeModal }) => {
    const [referenceNumber, setReferenceNumber] = useState("")
    const [validateRefResponse, setValidateRefResponse] = useState<ValidatePaymentRefResponse>({})
    const [isShowingConfirmation, setIsShowingConfirmation] = useState(false)

    const handleClose = () => {
        closeModal();
        setReferenceNumber("")
        setIsShowingConfirmation(false)
    };

    const handleChange = (value: string) => {
        setReferenceNumber(value)
        setIsShowingConfirmation(false)
    }

    const handleValidate = async () => {
        const response = await ValidatePaymentRefApi(referenceNumber)
        if (response.code >= statusEnum.ok) {
            setValidateRefResponse(response?.data?.data)
            setIsShowingConfirmation(true)
        } else {
            toast.error("Error validating reference number");
        }
    }

    const handleConfirm = async () => {
        const response = await confirmPublishersPaymentApi(referenceNumber)
        if (response.code >= statusEnum.ok) {
            closeModal()
            setReferenceNumber("")
            setIsShowingConfirmation(false)
            toast.success("Payment confirmed successfully")
        } else {
            toast.error(response.message);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
            <SlidersModalContainer width="50vw">
                <SlidersModalHeaderContainer>
                    <NewUserHeader>
                        <p>Confirm Payment</p>
                        <span></span>
                    </NewUserHeader>
                    <span onClick={() => handleClose()}>x</span>
                </SlidersModalHeaderContainer>
                <ContentWrapper>
                    <ReferenceWrapper>
                        <div>
                            <label className="bmd-label-floating">Reference Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="reference"
                                name="reference"
                                element-data="reference"
                                value={referenceNumber}
                                onChange={(e) => handleChange(e.target.value)}
                            />
                        </div>
                        <ValidationButton onClick={handleValidate}>
                            <p>Validate</p>
                        </ValidationButton>
                    </ReferenceWrapper>
                    {isShowingConfirmation && (
                        <ConfirmationWrapper>
                            <p>
                                Name: <span>{validateRefResponse?.name}</span>
                            </p>
                            <p>
                                Amount: <span>{validateRefResponse?.amount}</span>
                            </p>
                            <ConfirmationButton onClick={handleConfirm}>
                                <p>Confirm</p>
                            </ConfirmationButton>
                        </ConfirmationWrapper>
                    )}
                </ContentWrapper>
            </SlidersModalContainer>
        </Modal>
    );
}

export default PaymentValidationModal

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    padding: 0 50px;

    ${mediaQueries.mobile} {
        padding: 0 10px 15px;
    }
`;

const ReferenceWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 20px;

    & > div {
        flex-grow: 1;

        input {
            padding-left: 10px;
        }
    }
`;

const ValidationButton = styled(StyledButton)`
    padding: 0 20px;
    width: 110px;
    height: 35px;
    margin-top: 15px;
`;

const ConfirmationButton = styled(StyledButton)`
    height: 40px;
    width: 130px;
    align-self: flex-start;
`;

const ConfirmationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 20px;
    width: 40%;
    max-width: 80%;

    & > p {
        font-size: 18px;
    }

        & > p:first-of-type > span {
            font-size: 18px;
            font-weight: bold;
        }

        & > p:last-of-type > span {
            font-size: 25px;
            font-weight: bold;
        }
`