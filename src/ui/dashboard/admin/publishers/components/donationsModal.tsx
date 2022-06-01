import React from 'react'
import styled from 'styled-components';
import Modal from '../../../../../components/modal'
import { ContributionType } from '../../../../../types/appTypes';
import { NewUserHeader, SlidersModalContainer, SlidersModalHeaderContainer } from '../../branchDashboard/styles';

interface props {
    isOpen: boolean;
    closeModal: () => void;
    donationDetails: ContributionType[];
    publisherName: string;
}

const DonationsModal: React.FC<props> = ({ isOpen, closeModal, donationDetails, publisherName }) => {
    const handleClose = () => {
        closeModal();
    };

    const convertToDateTime = (date: string | Date) => {
        return new Date(date).toLocaleString();
    }

    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
            <SlidersModalContainer width="50vw">
                <SlidersModalHeaderContainer>
                    <NewUserHeader>
                        <p>{publisherName || ""}</p>
                        <span></span>
                    </NewUserHeader>
                    <span onClick={() => handleClose()}>x</span>
                </SlidersModalHeaderContainer>
                <ContentWrapper>
                    <p>Donation History</p>
                    <ReferenceWrapper>
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    donationDetails?.length > 0 ? donationDetails?.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.amountPaid}</td>
                                                <td>{convertToDateTime(item.monthPaid)}</td>
                                                <td>{item.status}</td>
                                            </tr>
                                        )
                                    }) : <tr className='empty'><td colSpan={4}>No data found</td></tr>
                                }
                            </tbody>
                        </table>
                    </ReferenceWrapper>
                </ContentWrapper>
            </SlidersModalContainer>
        </Modal>
    );
}

export default DonationsModal

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

const ReferenceWrapper = styled.div`
    width: 100%;
    max-height: 400px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 2px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #0b0146;
    }

    & > table th {
        font-weight: 600 !important;
    }

    & .empty {
        text-align: center;
    }
`;