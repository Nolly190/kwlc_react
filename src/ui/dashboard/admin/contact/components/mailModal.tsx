import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react'
import styled from 'styled-components';
import Modal from '../../../../../components/modal'
import { GetReportResponse, MailPayload } from '../../../../../types/appTypes';
import { NewUserHeader, SlidersModalContainer, SlidersModalHeaderContainer } from '../../branchDashboard/styles';

interface props {
    isOpen: boolean;
    closeModal: () => void;
    mail: MailPayload
}

const MailModal: React.FC<props> = ({ isOpen, closeModal, mail }) => {
    const handleClose = () => {
        closeModal();
    };

    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
            <SlidersModalContainer width="60vw">
                <SlidersModalHeaderContainer>
                    <NewUserHeader>
                        <p>Mail Details</p>
                        <span></span>
                    </NewUserHeader>
                    <span onClick={() => handleClose()}>x</span>
                </SlidersModalHeaderContainer>
                <ContentWrapper>
                    <form id="form">
                        <input type="hidden" element-data="key" value="category" />
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="bmd-label-floating">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        element-data="name"
                                        disabled
                                        value={mail.fullName}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="bmd-label-floating">Email Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="location"
                                        name="location"
                                        element-data="description"
                                        disabled
                                        value={mail.emailAddress}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="bmd-label-floating">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="code"
                                        name="code"
                                        element-data="code"
                                        disabled
                                        value={mail.subject}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="bmd-label-floating">
                                        Date
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="code"
                                        name="code"
                                        element-data="code"
                                        disabled
                                        value={new Date(mail.dateSent).toDateString()}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label className="bmd-label-floating">
                                        Body
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="code"
                                        name="code"
                                        element-data="code"
                                        cols={7}
                                        rows={7}
                                        disabled
                                        value={mail.body}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                    </form>
                </ContentWrapper>
            </SlidersModalContainer>
        </Modal>
    )
}

export default MailModal

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;

    & > p {
        font-size: 16px;
        font-weight: bold;
    }

    & textarea {
        padding: 8px 0;
    }
`;