import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { getPublishersHistoryApi } from '../../../../../api/publishers.api';
import Modal from '../../../../../components/modal'
import { statusEnum } from '../../../../../enums/util.enum';
import { ContributionType, PublishersHistoryResponse } from '../../../../../types/appTypes';
import { Button, NewUserHeader, SlidersModalContainer, SlidersModalHeaderContainer } from '../../branchDashboard/styles';

interface props {
    isOpen: boolean;
    closeModal: () => void;
    id: number
}

const testData: ContributionType[] = [
    {
        monthPaid: 'January',
        amountPaid: 100,
    },
    {
        monthPaid: 'January',
        amountPaid: 100,
    },
    {
        monthPaid: 'January',
        amountPaid: 100,
    }
]

const DonationsModal: React.FC<props> = ({ isOpen, closeModal, id }) => {
    const [donationDetails, setDonationDetails] = useState<PublishersHistoryResponse>({})

    const handleClose = () => {
        closeModal();
    };

    const convertToDateTime = (date: string | Date) => {
        const dateTime = new Date(date);
        return dateTime.toLocaleString();
    }

    useEffect(() => {
        async function getHistory() {
            const response = await getPublishersHistoryApi(id)
            if (response.code >= statusEnum.ok) {
                setDonationDetails(response?.data?.data)
            } else {
                toast.error(response.message);
            }
        }

        getHistory()
    }, [])

    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
            <SlidersModalContainer width="50vw">
                <SlidersModalHeaderContainer>
                    <NewUserHeader>
                        <p>{`${donationDetails?.firstName || ""} ${donationDetails?.lastName || ""}`}</p>
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
                                    donationDetails?.contributions?.length > 0 ? donationDetails?.contributions?.map((item, index) => {
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

const StyledButton = styled(Button)`
    padding: 0 20px;
    width: 110px;
    height: 35px;
    margin-top: 15px;
    margin-right: 14px;
`;