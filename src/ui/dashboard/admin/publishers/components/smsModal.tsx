import React, { useState } from 'react'
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { sendSMSPublisherApi } from '../../../../../api/publishers.api';
import Modal from '../../../../../components/modal'
import { statusEnum } from '../../../../../enums/util.enum';
import { SendSMSPublishersPayload } from '../../../../../types/appTypes';
import { StyledButton, NewUserHeader, SlidersModalContainer, SlidersModalHeaderContainer } from '../../branchDashboard/styles';

interface props {
    isOpen: boolean;
    closeModal: () => void;
}

const SmsModal: React.FC<props> = ({ isOpen, closeModal }) => {
    const [formData, setFormData] = useState<SendSMSPublishersPayload>({})

    const handleClose = () => {
        closeModal();
    };

    const handleChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async () => {
        const response = await sendSMSPublisherApi(formData)
        if (response.code >= statusEnum.ok) {
            toast.success("SMS sent successfully")
        } else {
            toast.error(response.message);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
            <SlidersModalContainer width="45vw">
                <SlidersModalHeaderContainer>
                    <NewUserHeader>
                        <p>Send SMS</p>
                        <span></span>
                    </NewUserHeader>
                    <span onClick={() => handleClose()}>x</span>
                </SlidersModalHeaderContainer>
                <ContentWrapper>
                    <ReferenceWrapper>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label className="bmd-label-floating">Text Body</label>
                                <textarea
                                    className="form-control"
                                    id="message"
                                    name="message"
                                    element-data="message"
                                    value={formData?.message || ""}
                                    cols={5}
                                    rows={5}
                                    onChange={(e) =>
                                        handleChange(e.target.name, e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <SmsButton onClick={handleSubmit}>
                            <p>Send</p>
                        </SmsButton>
                    </ReferenceWrapper>
                </ContentWrapper>
            </SlidersModalContainer>
        </Modal>
    );
}

export default SmsModal

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
`;

const ReferenceWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    gap: 20px;

    & > div {
        flex-grow: 1;
    }
`;

const SmsButton = styled(StyledButton)`
    padding: 0 20px;
    width: 110px;
    height: 35px;
    margin-top: 15px;
    margin-right: 14px;
`;