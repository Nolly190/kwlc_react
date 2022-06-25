import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react'
import styled from 'styled-components';
import Modal from '../../../../../components/modal'
import { GetReportResponse } from '../../../../../types/appTypes';
import { NewUserHeader, SlidersModalContainer, SlidersModalHeaderContainer } from '../../branchDashboard/styles';

interface props {
    isOpen: boolean;
    closeModal: () => void;
    report: GetReportResponse
}

const ReportModal: React.FC<props> = ({ isOpen, closeModal, report }) => {
    const { sermon, attendance } = report;

    const handleClose = () => {
        closeModal();
    };

    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
            <SlidersModalContainer width="60vw">
                <SlidersModalHeaderContainer>
                    <NewUserHeader>
                        <p>Branch Report</p>
                        <span></span>
                    </NewUserHeader>
                    <span onClick={() => handleClose()}>x</span>
                </SlidersModalHeaderContainer>
                <ContentWrapper>
                    <Tabs isFitted variant='enclosed'>
                        <TabList mb='1em'>
                            <Tab>Sermon</Tab>
                            <Tab>Attendance</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <form id="form">
                                    <input type="hidden" element-data="key" value="category" />
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">Minister</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="title"
                                                    name="title"
                                                    element-data="name"
                                                    disabled
                                                    value={sermon.preacher}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">Message Title</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="location"
                                                    name="location"
                                                    element-data="description"
                                                    disabled
                                                    value={sermon.message}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">
                                                    Bible Text
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="code"
                                                    name="code"
                                                    element-data="code"
                                                    disabled
                                                    value={sermon.text}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">
                                                    Programme
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="code"
                                                    name="code"
                                                    element-data="code"
                                                    disabled
                                                    value={sermon.programme}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">
                                                    Venue
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="code"
                                                    name="code"
                                                    element-data="code"
                                                    disabled
                                                    value={sermon.venue}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                </form>
                            </TabPanel>
                            <TabPanel>
                                <form id="form">
                                    <input type="hidden" element-data="key" value="category" />
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">Male</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="title"
                                                    name="title"
                                                    element-data="name"
                                                    disabled
                                                    value={attendance.male}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">Female</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="location"
                                                    name="location"
                                                    element-data="description"
                                                    disabled
                                                    value={attendance.female}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">Children</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="location"
                                                    name="location"
                                                    element-data="description"
                                                    disabled
                                                    value={attendance.children}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">
                                                    Online Worshippers
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="code"
                                                    name="code"
                                                    element-data="code"
                                                    disabled
                                                    value={attendance.onlineWorshiper}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">
                                                    Visitors
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="code"
                                                    name="code"
                                                    element-data="code"
                                                    disabled
                                                    value={attendance.visitors}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">
                                                    Converts
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="code"
                                                    name="code"
                                                    element-data="code"
                                                    disabled
                                                    value={attendance.converts}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">
                                                    Total Attendance
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="code"
                                                    name="code"
                                                    element-data="code"
                                                    disabled
                                                    value={attendance.totalAttendance}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                </form>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>

                </ContentWrapper>
            </SlidersModalContainer>
        </Modal>
    )
}

export default ReportModal

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;

    & > p {
        font-size: 16px;
        font-weight: bold;
    }
`;