import React, { useState } from 'react'
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { confirmManualPaymentApi } from '../../../../../api/publishers.api';
import Modal from '../../../../../components/modal'
import { statusEnum } from '../../../../../enums/util.enum';
import mediaQueries from '../../../../../mediaQueries';
import { ConfirmManualPaymentPayload } from '../../../../../types/appTypes';
import { isValid } from '../../../../../utils';
import { StyledButton, NewUserHeader, SlidersModalContainer, SlidersModalHeaderContainer } from '../../branchDashboard/styles';

interface props {
    isOpen: boolean;
    closeModal: () => void;
}

const ConfirmPaymentModal: React.FC<props> = ({ isOpen, closeModal }) => {
    const [formData, setFormData] = useState<ConfirmManualPaymentPayload>()

    const handleConfirm = async () => {
        if (!isValid(formData) || !formData.date) {
            toast.error("Please fill all fields")
            return
        }

        const response = await confirmManualPaymentApi(formData)
        if (response.code >= statusEnum.ok) {
            toast.success("Payment confirmed successfully")
            closeModal()
        } else {
            toast.error(response.message);
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
            <SlidersModalContainer width="50vw">
                <SlidersModalHeaderContainer>
                    <NewUserHeader>
                        <p>Confirm Manual Payment</p>
                        <span></span>
                    </NewUserHeader>
                    <span onClick={() => closeModal()}>x</span>
                </SlidersModalHeaderContainer>
                <ContentWrapper>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="bmd-label-floating">Publisher Id</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="uniqueId"
                                    name="uniqueId"
                                    element-data="uniqueId"
                                    value={formData?.uniqueId}
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="bmd-label-floating">Amount</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="amount"
                                    name="amount"
                                    element-data="amount"
                                    value={formData?.amount}
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group" style={{ marginTop: 37 }}>
                                <label className="bmd-label-floating">Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="date"
                                    name="date"
                                    element-data="date"
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <ConfirmationButton onClick={handleConfirm}>
                        <p>Confirm</p>
                    </ConfirmationButton>
                </ContentWrapper>
            </SlidersModalContainer>
        </Modal>
    );
}

export default ConfirmPaymentModal

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    padding: 0 20px;

    ${mediaQueries.mobile} {
        padding: 0 10px 15px;
    }
`;

const ConfirmationButton = styled(StyledButton)`
    height: 40px;
    width: 130px;
    align-self: flex-end;
`;